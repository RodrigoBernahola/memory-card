export default function Card({url, name, key}) {

    return (
        <article key={key}>
            <img src={url} alt="" />
            <p>{name}</p>
        </article>
    )

}