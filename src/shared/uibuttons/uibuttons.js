import './uibuttons.css';

const Button = (props) => {
    return (
        <button type="button" className="uibutton" {...props} />
    );
}


export { Button as default, Button }