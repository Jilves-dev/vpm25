import styles from './content.module.scss';

function Content(props) {
    return(
        <div className={styles.content}>
            {props.children}
        </div>
    )
}

export default Content;