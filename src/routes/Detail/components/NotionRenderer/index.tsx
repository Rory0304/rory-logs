"use client"

import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { ExtendedRecordMap } from "notion-types"
import useScheme from "src/hooks/useScheme"
import type { Scheme } from "src/styles/theme"

// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css"

// used for code syntax highlighting (optional)
import "prismjs/themes/prism-tomorrow.css"

// used for rendering equations (optional)

import "katex/dist/katex.min.css"
import { FC } from "react"
import styled from "@emotion/styled"

const _NotionRenderer = dynamic(
  () => import("react-notion-x").then((m) => m.NotionRenderer),
  { ssr: false }
)

const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then(async (m) => {
    await Promise.all([
      import("prismjs/components/prism-markup-templating.js"),
      import("prismjs/components/prism-markup.js"),
      import("prismjs/components/prism-docker.js"),
      import("prismjs/components/prism-js-templates.js"),
      import("prismjs/components/prism-diff.js"),
      import("prismjs/components/prism-git.js"),
      import("prismjs/components/prism-graphql.js"),
      import("prismjs/components/prism-handlebars.js"),
      import("prismjs/components/prism-less.js"),
      import("prismjs/components/prism-makefile.js"),
      import("prismjs/components/prism-markdown.js"),
      import("prismjs/components/prism-reason.js"),
      import("prismjs/components/prism-sass.js"),
      import("prismjs/components/prism-scss.js"),
      import("prismjs/components/prism-wasm.js"),
      import("prismjs/components/prism-yaml.js"),
    ])
    return m.Code
  })
)

const Collection = dynamic(() =>
  import("react-notion-x/build/third-party/collection").then(
    (m) => m.Collection
  )
)
const Equation = dynamic(() =>
  import("react-notion-x/build/third-party/equation").then((m) => m.Equation)
)
const Pdf = dynamic(
  () => import("react-notion-x/build/third-party/pdf").then((m) => m.Pdf),
  {
    ssr: false,
  }
)
const Modal = dynamic(
  () => import("react-notion-x/build/third-party/modal").then((m) => m.Modal),
  {
    ssr: false,
  }
)

const mapPageUrl = (id: string) => {
  return "https://www.notion.so/" + id.replace(/-/g, "")
}

type Props = {
  recordMap: ExtendedRecordMap
}

const NotionRenderer: FC<Props> = ({ recordMap }) => {
  const [scheme] = useScheme()
  return (
    <StyledWrapper scheme={scheme}>
      <_NotionRenderer
        darkMode={scheme === "dark"}
        recordMap={recordMap}
        components={{
          Code,
          Collection,
          Equation,
          Modal,
          Pdf,
          nextImage: Image,
          nextLink: Link,
        }}
        mapPageUrl={mapPageUrl}
      />
    </StyledWrapper>
  )
}

export default NotionRenderer

const StyledWrapper = styled.div<{ scheme: Scheme }>`
  .notion-collection-page-properties {
    display: none !important;
  }

  .notion-list {
    max-width: 100%;
    overflow-x: scroll;
  }

  .notion-list-numbered {
    padding-left: 1rem;
  }

  .notion-inline-underscore {
    text-underline-offset: 4px;
  }

  .notion-page {
    width: 100%;
    padding: 0;
    margin: 0;
  }

  .notion-hr {
    border-top: 1px solid hsl(0, 0%, 88.7%);
  }

  .notion-inline-code {
    display: inline-block;
  }

  blockquote.notion-quote {
    font-size: 16px !important;
    background-color: ${({ scheme }) =>
      scheme === "dark" ? "" : "rgb(244, 244, 245) !important"};
  }
`
