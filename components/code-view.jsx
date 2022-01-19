
import SyntaxHighlighter from 'react-syntax-highlighter'

// https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/
import { solarizedDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs'

const CodeView = (props) => {
    return ( 
        <SyntaxHighlighter language="javascript" showLineNumbers style={solarizedDark}>
            { props.children }
        </SyntaxHighlighter>
     );
}
 
export default CodeView;