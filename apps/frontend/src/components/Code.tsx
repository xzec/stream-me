import { motion } from 'framer-motion'
import { Fragment, forwardRef } from 'react'

type CodeProps = { code: string[] }

const Code = forwardRef<HTMLPreElement, CodeProps>(({ code }, ref) => (
  <pre ref={ref}>
    <code className="language-javascript">
      {code.map((line, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: valid use of index keys
        <Fragment key={index}>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="line-number">
            {index + 1}
          </motion.span>
          <motion.div
            className="line-of-code"
            initial={{ opacity: 0.2, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              type: 'spring',
              duration: 0.5,
            }}
            // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted source of html
            dangerouslySetInnerHTML={{ __html: line }}
          />
        </Fragment>
      ))}
    </code>
  </pre>
))

export default Code
