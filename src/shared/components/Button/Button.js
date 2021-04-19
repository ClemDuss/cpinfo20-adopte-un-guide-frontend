import './Button.css';

export default function Button({text, theme, outlined}){
    return(
        <div
            className={
                `button
                ${theme == 'error' ? ' button-error' : ''}
                ${theme == 'success' ? ' button-success' : ''}
                ${outlined ? ' outlined' : ''}`
            }
        >
            {text}
        </div>
    );
}