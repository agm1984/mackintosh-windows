import React, { Component } from 'react'

/**
 * Backend skills are loaded as a Functor Object:
 *
 * - This should facilitate any future expansion.
 * - Key order determines rendering order.
 * - List currently supports two states: expanded and collapsed.
 */
class BackendSkills extends Component {
  constructor(props) {
    super(props)
    this.state = {
      node: {
        icon: require('./icons/ski_list_icon-node.png'),
        label: 'node.js',
        relatedSkills: [
          { icon: require('./icons/ski_list_icon-es6.png'), label: 'Advanced ES6+ Syntax' },
          { icon: require('./icons/ski_list_icon-express.png'), label: 'Express.js' },
          { icon: require('./icons/ski_list_icon-hapi.png'), label: 'Hapi.js' },
        ],
        isExpanded: false,
      },
      graphql: {
        icon: require('./icons/ski_list_icon-graphql.png'),
        label: 'GraphQL',
        relatedSkills: [
          { icon: require('./icons/ski_list_icon-apollo.png'), label: 'Apollo Server' },
          { icon: require('./icons/ski_list_icon-apollo.png'), label: 'Apollo Client' },
        ],
        isExpanded: false,
      },
      neo4j: {
        icon: require('./icons/ski_list_icon-neo4j.png'),
        label: 'Neo4j',
        relatedSkills: [
          { icon: require('./icons/ski_list_icon-neo4j.png'), label: 'Related Data' },
          { icon: require('./icons/ski_list_icon-neo4j.png'), label: 'Recommendation Engines' },
          { icon: require('./icons/ski_list_icon-neo4j.png'), label: 'Data Visualization' },
        ],
        isExpanded: false,
      },
      mongoDB: {
        icon: require('./icons/ski_list_icon-mongodb.png'),
        label: 'MongoDB',
        relatedSkills: [
          { icon: require('./icons/ski_list_icon-mongodb.png'), label: 'MongoDB Native (schema-less)' },
          { icon: require('./icons/ski_list_icon-mongoose.png'), label: 'Mongoose' },
        ],
        isExpanded: false,
      },
      redis: {
        icon: require('./icons/ski_list_icon-redis.png'),
        label: 'Redis',
        relatedSkills: [
          { icon: require('./icons/ski_list_icon-redis.png'), label: 'Server-side Caching' },
          { icon: require('./icons/ski_list_icon-redis.png'), label: 'Semaphores' },
        ],
        isExpanded: false,
      },
      backendQA: {
        icon: require('./icons/ski_list_icon-qa.png'),
        label: 'Back-end QA',
        relatedSkills: [
          { icon: require('./icons/ski_list_icon-qa.png'), label: 'Unit Testing' },
          { icon: require('./icons/ski_list_icon-qa.png'), label: 'Integration Testing' },
        ],
        isExpanded: false,
      },
      architecture: {
        icon: require('./icons/ski_list_icon-architecture.png'),
        label: 'Architecture',
        relatedSkills: [
          { icon: require('./icons/ski_list_icon-aws.png'), label: 'AWS Console' },
          { icon: require('./icons/ski_list_icon-microservices.png'), label: 'Microservices' },
          { icon: require('./icons/ski_list_icon-docker.png'), label: 'Docker' },
        ],
        isExpanded: false,
      },
      linux: {
        icon: require('./icons/ski_list_icon-linux.png'),
        label: 'Linux',
        relatedSkills: [
          { icon: require('./icons/ski_list_icon-ubuntu.png'), label: 'Ubuntu' },
          { icon: require('./icons/ski_list_icon-fedora.png'), label: 'Fedora' },
        ],
        isExpanded: false,
      },
      cicd: {
        icon: require('./icons/ski_list_icon-cicd.png'),
        label: 'CI / CD',
        relatedSkills: [
          { icon: require('./icons/ski_list_icon-jenkins.png'), label: 'Jenkins' },
        ],
        isExpanded: false,
      },
    }
  }

  render() {
    return Object.keys(this.state).map((skill) => {
      // COLLAPSED STATE
      if (!this.state[skill].isExpanded) {
        return (
          <button
            className="ski_list-collapsedRow"
            onClick={() => this.setState({
              [skill]: {
                ...this.state[skill],
                isExpanded: !this.state[skill].isExpanded,
              },
            })}
            key={skill}
          >
            <img
              className="ski_list-toggleIcon"
              src={require('./icons/ski_list_icon-plus.png')}
              alt="Row Toggle Icon"
            />
            <img
              className="ski_list-icon"
              src={this.state[skill].icon}
              alt="Row Icon"
            />
            {this.state[skill].label}
          </button>
        )
      }

      // EXPANDED STATE
      return (
        <button
          className="ski_list-expandedRow"
          onClick={() => this.setState({
            [skill]: {
              ...this.state[skill],
              isExpanded: !this.state[skill].isExpanded,
            },
          })}
          key={skill}
        >
          <div className="ski_list-expandedRowTop">
            <img
              className="ski_list-toggleIcon"
              src={require('./icons/ski_list_icon-minus.png')}
              alt="Row Toggle Icon"
            />
            <img
              className="ski_list-icon"
              src={this.state[skill].icon}
              alt="Skill Icon"
            />
            {this.state[skill].label}
          </div>
          <ul className="ski_list_subskill-container">
            {this.state[skill].relatedSkills.map((subSkill, i) => (
              <li
                className="ski_list_subskill-row"
                key={i}
              >
                └
                <img
                  className="ski_list-icon"
                  src={subSkill.icon}
                  alt="Sub-skill Icon"
                />
                {subSkill.label}
              </li>
            ))}
          </ul>
        </button>
      )
    })
  }
}

export default BackendSkills
