import React, { Component } from 'react'
import ContentEditable from 'react-contenteditable'
import Card from '../../common/ui/card/card'
import PostCard from '../../common/ui/postCard/postCard'

export default class PublicFeed extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editDescription: false,
            descriptionContent: '👨‍💼 5years + crypto trading experience. \
            📈 High Risk, and high Profitability \
            👣 Follow me! '

        }
        this.toggleEdit = this.toggleEdit.bind(this)
        this.handleDescription = this.handleDescription.bind(this)
        this.saveDescription = this.saveDescription.bind(this)
        this.resetDescription = this.resetDescription.bind(this)
    }

    toggleEdit() {
        this.setState({ editDescription: !this.state.editDescription })
    }
    handleDescription(e) {
        this.setState({ descriptionContent: e.target.value })
    }
    saveDescription() {
        //call da action para salvar description
        this.toggleEdit()
    }
    resetDescription() {
        this.toggleEdit()

    }

    render() {
        const { editDescription, descriptionContent } = this.state
        return (
            <div>
                <div className="col-md-6 col-sm-12">
                    <PostCard
                        title="Description"
                        isEditable={editDescription}
                        toggleEdit={this.toggleEdit}
                        content={descriptionContent}
                        handleContent={this.handleDescription}
                        saveContent={this.saveDescription}
                        resetContent={this.resetDescription}
                    />
                </div>
            </div>
        )
    }
}

