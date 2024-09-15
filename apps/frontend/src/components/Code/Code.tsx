import { motion } from 'framer-motion'
import { Fragment, forwardRef } from 'react'
import classes from './code.module.css'

type CodeProps = {
  code: string[]
}

const Code = forwardRef<HTMLPreElement, CodeProps>(({ code }, ref) => (
  <pre className={classes.codeBlock} ref={ref}>
    <code>
      {code.map((line, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: valid use of index keys
        <Fragment key={index}>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={classes.lineNumber}>
            {index + 1}
          </motion.span>
          <motion.div
            initial={{ backgroundColor: '#259425' }}
            animate={{ backgroundColor: '#25942500' }}
            transition={{
              duration: 1,
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
