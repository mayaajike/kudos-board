import '../CSS/CommentsModal.css'

export default function CommentsModal() {
    return (
        <div className="comments-modal">
            <div className='card-info'>
                <img className='class-image'/>
                <p className="card-text"></p>
            </div>
            <div className="comments">
                <div className="comment">
                    <p className="comment-text"></p>
                    <p className="author-name"></p>
                </div>
            </div>
        </div>
    )
}
