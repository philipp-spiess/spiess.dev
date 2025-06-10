---
date: 2023-05-02
---

A lot of companies love ClickHouse for it's great performance as LDAP system, incredible compression, and its ease of deployment. 

This is a list of features that are perhaps less known about but also quite powerful:

- [**Materialized Columns**](https://clickhouse.com/docs/en/sql-reference/statements/alter/column#materialize-column): This feature allows you to add new columns (which, given the fact that ClickHouse is column based, is very cheap) that derive the data from existing fields. You can imagine a generic log table with a json text field and you want to extract a specific field from the JSON into a custom column. With this feature, you can start your log table in an unstructured form and gradually migrate to a schema over time. 
   Check out [this video from Altinity](https://www.youtube.com/watch?v=pZkKsfr8n3M) for more informations.
-  [**TTL**](https://clickhouse.com/docs/en/guides/developer/ttl): ClickHouse allows you to define how long data inside tables and even specific columns is being retained. I think this is an amazing feature for sensitive data, ensuring the data is only retained as long as it is necessary for analytical purposes.
- [**Automatic schema inference from JSON**](https://clickhouse.com/docs/en/interfaces/schema-inference#json-formats): Granted, this is a very niche feature but I assume it could be amazing in combination with materialized columns to gradually _and automatically_ convert an untyped JSON payload into a typed column structure.
- [**Quotas**](https://clickhouse.com/docs/en/sql-reference/statements/create/quota): A feature to allow you to limit resources in a multi-tenant ClickHouse deployment. You don't care about it until you absolutely need it, and here you just get it for free. 