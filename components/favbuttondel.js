import Image from "next/image";

const FavButtondel = ({ el }) => {
    return (
        <div data-elem={`vacancy-${el}-shortlist-button`}>
            <Image src="Star2.svg" width={20} height={20} alt='star2' data-elem={`vacancy-${el}-shortlist-button`} />
        </div>

    )
}

export default FavButtondel