export default function Card({url, name, onClick, dataId}) {

    return (
        <article onClick={onClick} data-id={dataId} >
            <img src={url} alt="" />
            <p>{name}</p>
        </article>
    )

}