import Image from "next/image";


const FavButtonadd = ({ el }) => {
    return (
        <div data-elem={`vacancy-${el}-shortlist-button`} >
            <Image src="Star.svg" width={20} height={20} alt='star' data-elem={`vacancy-${el}-shortlist-button`} />
        </div>

    )
}

export default FavButtonadd