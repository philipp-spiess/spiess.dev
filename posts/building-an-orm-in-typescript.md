---
title: Building an ORM in TypeScript
date: "2023-05-04T12:00:00.000Z"
---

I've recently been working more with structured logging and as part of this, I wanted to build a TypeScript ORM for creating table definitions.

Inspired by [Drizzle ORM](https://github.com/drizzle-team/drizzle-orm) and [Zod](https://github.com/colinhacks/zod), my goal was to create the table definitions fully in TypeScript code so that I can generate the schema by simply executing the code, and also having an easy way to get the resulting TypeScript definitions:

```ts
const loggerConfig = createLoggerConfig("test", {
  message: string(),
  randomNumber: float64(),
  timestamp: datetime(),
});
```

Here is how I implemented this!

_⚠️ We make heavy use of TypeScript generics for this. Make sure to [catch up on them](https://www.typescriptlang.org/docs/handbook/2/generics.html) first._

We start by implementing the `createLoggerConfig` function. It's typed as a generic with two generic types:

- The event name: A literal string (`test` in the example above)
- The properties: An object of field definitions.

One neat thing about TypeScript is that it can infer the type of the generics if they are referenced from the function definition, so if we can do something like this without requiring extra work when someone calls this function:

```ts
function createLoggerConfig<E, F>(event: E, fields: F) {
  // ...
}
```

We can also restrict the type of the `event` and `fields` table of that generic so that it only accepts string types for the event name and valid field definitions for the fields:

```ts
function createLoggerConfig<
  E extends string,
  F extends { [key: string]: Field<any, any> }
>(event: E, fields: F) {
  // ...
}
```

We'll look into the return type and the `Field` type more closely in a second.

## But why do we use generics at all?

You might be thinking: Why all this fuzz when I can also restrict the arguments via normal TypeScript syntax. That's what it's used for, after all!

```ts
function createLoggerConfig(
  event: string,
  fields: { [key: string]: Field<any, any> }
) {
  // ...
}
```

You're right, this _does restrict the argument_. Remember that one of the foals of this ORM is that we will be able to use the declared schema to also generate a TypeScript object definitions for the logger. The problem without using generics is that you will always have a non-generic return type. So no matter what you pass into the `createLoggerConfig`, the returned _thing_ won't have any type definition that _depend on the arguments_.

## Defining the `Field`s

The ORM I needed to build only had to support a couple of types available in the ClickHouse database, specifically:

- `string`
- `float64`
- `datetime`

If you remember the example snipped above, these should be declared as function calls. Nothing easier than that!

To make sure they retain the type information _and later have a way to map to the JavaScript type_, here's how I created and typed these:

```ts
type FieldType = "string" | "float64" | "datetime";

class Field<T extends FieldType, JST extends unknown> {
  constructor(public type: T, public jsType: JST) {}
}

function string(): Field<"string", string> {
  return new Field("string", "");
}

function float64(): Field<"float64", number> {
  return new Field("float64", 0);
}

function datetime(): Field<"datetime", Date> {
  return new Field("datetime", new Date());
}
```

The only thing that is a bit odd here is that we define both a `T` on the field, which maps to the literal of the ClickHouse type, and a `JST` which maps to the equivalent of the type that we want to be using in TypeScript when we create entries for this logger config.

We also assign a placeholder value to the JS type and store it as a public member of the Field class. This is perhaps unexpected (and maybe even unnecessary? Let me know!) but I found this to be useful to later access the TypeScript type from the field definition.

## Return type

One thing that we have not specified yet is the return type of `createLoggerConfig`. To make it easier to later add implementations to the schema, I decided to create a class for this:

```ts
class LoggerConfig<
  E extends string,
  F extends { [key: string]: Field<FieldType, unknown> }
> {
  constructor(public event: E, public fields: F) {}
}
```

With this we can change the initial `createLoggerConfig` function to do something like this:

```ts
function createLoggerConfig<
  E extends string,
  F extends { [key: string]: Field<any, any> }
>(event: E, fields: F): LoggerConfig<E, F> {
  return new LoggerConfig<E, F>(event, fields);
}
```

## ✨ The magical `Infer<>`

As mentioned in the beginning, one goal of this exercise was to later be able to map the schema declaration to a TypeScript object type which, for the example above, should look like this:

```ts
interface Test {
  message: string;
  randomNumber: number;
  timestamp: Date;
}
```

This way, when inserting new rows into the logger table, we can leverage the TypeScript type safety and get helpful errors if we're passing invalid values.

In Drizzle and Zod, this is done by a magical Infer type that can be used like this:

```ts
const loggerConfig = createLoggerConfig(/* insert config from above */);

type Test = Infer<typeof loggerConfig>;
```

But how do we implement this `Infer<T>` type?

Turns out, it's possible to do this by combining a few TypeScript features:

- We rely on the generics that are passed from the `createLoggerConfig` call.
- We use `keyof` to get all keys (properties) from the fields property inside the logger config
- We use [mapped types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html) to map over each of the fields and access the public `jsType` property we set earlier

If this sounds super confusing to you, you're not alone! Here's what I ended up with:

```ts
type Infer<T extends LoggerConfig<any, any>> = {
  [Property in keyof T["fields"]]: T["fields"][Property]["jsType"];
};
```

Pretty awesome! If we wire everything up together and use the power of the TypeScript IDE integrations, we can see hover over the inferred type and see that it works as we expect it to:

![Screenshot of a hover tooltip in TypeScript showing the inferred type as outlined above](/blog/building-an-orm-in-typescript/hover.png)

Check out the [TypeScript playground](https://www.typescriptlang.org/play?#code/C4TwDgpgBAYglhANgEwCrmgXigIgM7ABOcAdgOY5QA+uAZogPYCGwAbACyU07IsTBwAthBwBuAFDiAxoiZ48sBCgA8qKBAAewCCWQL4SNBgA0UAFIBlNZu26FAVxIBrEgwDuJAHxQA3uKhQUgwkBIT2UsAMhAAUYPYARohwUlCgkABcUKimcYnJUABWeOgZ5lYAlL4AvuI14rSOEXDBUKGkZNHlmQYq+ETtOKZt5N5+AYT89oQkUCQQboqG0X3E5IO4OOUSdQ0kTS30zGzsnd1KyMo4hywc6yT2gvEQhKP+UBPAUzNzCz3Iy9djusAAxbWqSXb7Ga8bQCYSnRa9GH8IQiUwAET4r3Gk2ms3miP+PD4cLR+IWmO0nTBO0aAhaUgmfAAMgwyGRngBhYK0OBkZRvACi6i0Oj0rX65GMbxgIts4p8UAA2k4ICBMsMyABdM6GZRMEggUwGkDeGqeaIQABuOmAmUFpl5hjw3S6UFZ7K5PL5ygdsGx71x3wJHo5hG5JF5-L9MAt1ttjvOeBpkhkcgUoa9kZ9QrlYoUmulAVlNnzvmVqvVEtW2t1Kj+JQgpkcLncXig5t8byCISI4UiMVySRS8ZIdqgfqH+SdKBdsEqPhqdTS0AAkpHnqo83Z3WywxGo-rDcbDZ5vNgxsqAApQUhQSsMWhZJVXJM4LU65+v53vpVXrUvkUjbvtsEipsEBBQIwnrht6ZBQNgjIQCye5ZlGyzaAQ6yXsI8hMByGqSh05RFu8BrIAwggAHIPE8hCZICHCdKRpIEEwghgJkyKksxtRguIK5ZBAkHYOutCbiuj5QahsHZmQngSEAA) to play around with it yourself!
