export default function Card({url, name, onClick, dataId}) {

    return (
        <article className="card" onClick={onClick} data-id={dataId} >
            <img src={url} alt={name} />
            <p>{name}</p>
        </article>
    )

}
