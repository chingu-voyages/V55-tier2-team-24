import PageNotFound from "/images/PageNotFound.png"

export default function BrokenURLPage() {
    return (
        <div className="flex justify-center items-center">
            <img src={PageNotFound}
            alt="image of a pirate with the text page not found"
            className="w-3xl mt-30 opacity-75"
            />
        </div>
    )
}