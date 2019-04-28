import React from 'react'
import ContentEditable from 'react-contenteditable'
import Card from '../card/card';


const PostCard = ({ isEditable, content, handleContent, toggleEdit, saveContent, resetContent, title })=>{
    return(
        <Card title={title} opt={[{ label: 'Edit', func: toggleEdit }]} >
            <ContentEditable
                disabled={!isEditable}
                html={content}
                onChange={handleContent} />
            <div>
                <button type="button"
                    className="btn btn-outline btn-success btn-post-card"
                    style={{
                        display: isEditable ? 'block' : 'none'
                    }}
                    onClick={() => saveContent()}>Save
                            </button>
                <button type="button"
                    className="btn btn-outline btn-danger btn-post-card"
                    style={{                        
                        display: isEditable ? 'block' : 'none'
                    }}
                    onClick={() => toggleEdit()}>Cancel
                            </button>
            </div>
        </Card>
    )
}

export default PostCard