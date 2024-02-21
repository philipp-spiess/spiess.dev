import Image from "next/image"

interface Props {
  width: number
}

export default function Avatar({ width }: Props) {
  return (
    <Image
      src={`https://www.gravatar.com/avatar/046db2877d2f9342de37d0d59c5df4a9?s=${
        width * 2
      }`}
      width={width}
      height={width}
      style={{
        borderRadius: "50%",
      }}
      alt="Philipp Spiess"
    />
  )
}
