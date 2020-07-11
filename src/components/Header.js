import React, {Component} from 'react';
import { connect } from "react-redux";
import { setCurrentProjectId } from "../actions";
import { getProjects } from "../reducers";

class Header extends Component {
    onCurrentProjectChange = e => {
        this.props.setCurrentProjectId(Number(e.target.value));
    };

    render() {
        console.log("Rendering Header");

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
                        <select onChange={this.onCurrentProjectChange} className="project-menu">
                            {projectOptions}
                        </select>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        projects: getProjects(state)
    };
}

export default connect(mapStateToProps, { setCurrentProjectId })(Header);