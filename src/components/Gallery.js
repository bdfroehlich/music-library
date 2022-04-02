import GalleryItem from './GalleryItem'

function Gallery(props){
    //adapt gallery to reference the data from read() in helper.js
    const data = props.data.result.read();

    const display = data.map((item, index) => {
        return (
            <GalleryItem item={item} key={index} />
        )
    })

    return (
        <div>
        {display}
        </div>
    )
}

export default Gallery