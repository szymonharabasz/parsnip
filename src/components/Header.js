import React, {Component} from 'react';

class Header extends Component {
    render() {
        const projectOptions = this.props.projects.map(project =>
            <option key={project.id} value={project.id}>
                {project.name}
            </option>
        );

        return (
            <div className="page-header-container">
                <div className="page-header">
                    <div className="project-item">
                        Project:
                        <select onChange={this.props.onCurrentProjectChange} className="project-menu">
                            {projectOptions}
                        </select>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;