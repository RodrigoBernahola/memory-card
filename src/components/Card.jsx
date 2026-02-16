export default function Card({url, name}) {

    return (
        <article>
            <img src={url} alt="" />
            <p>{name}</p>
        </article>
    )

}