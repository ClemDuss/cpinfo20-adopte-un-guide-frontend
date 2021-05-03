import './Button.css';

export default function Button({text, theme, outlined}){
    return(
        <div
            className={
                `button
                ${theme == 'error' ? ' button-error' : ''}
                ${theme == 'success' ? ' button-success' : ''}
                ${theme == 'primary' ? ' button-primary' : ''}
                ${theme == 'green-mtn' ? ' button-green-mtn' : ''}
                ${outlined ? ' outlined' : ''}`
            }
        >
            {text}
        </div>
    );
}