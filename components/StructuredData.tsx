import Script from "next/script"

interface StructuredDataProps {
  data: object
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <Script id="structured-data" type="application/ld+json">
      {JSON.stringify(data)}
    </Script>
  )
}

