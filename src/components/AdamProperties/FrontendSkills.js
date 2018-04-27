import React, { Component } from 'react'

/**
 * Frontend skills are loaded as a Functor Object:
 *
 * - This should facilitate any future expansion.
 * - Key order determines rendering order.
 * - List currently supports two states: expanded and collapsed.
 */
class FrontendSkills extends Component {
  constructor(props) {
    super(props)
    this.state = {
      react: {
        icon: require('./icons/ski_list_icon-react.png'),
        label: 'React',
        relatedSkills: [
          { icon: require('./icons/ski_list_icon-redux.png'), label: 'Redux' },
        ],
        isExpanded: false,
      },
      reactNative: {
        icon: require('./icons/ski_list_icon-reactNative.png'),
        label: 'React Native',
        relatedSkills: [],
        isExpanded: false,
      },
      graphicDesign: {
        icon: require('./icons/ski_list_icon-graphicDesign.png'),
        label: 'Graphic Design',
        relatedSkills: [
          { icon: require('./icons/ski_list_icon-photoshop.png'), label: 'Adobe Photoshop' },
          { icon: require('./icons/ski_list_icon-indesign.png'), label: 'Adobe InDesign' },
        ],
        isExpanded: false,
      },
      uxUI: {
        icon: require('./icons/ski_list_icon-ux.png'),
        label: 'UX/UI',
        relatedSkills: [
          { icon: require('./icons/ski_list_icon-functionalSpecs.png'), label: 'Functional Specifications' },
          { icon: require('./icons/ski_list_icon-wireframe.png'), label: 'Wireframes' },
          { icon: require('./icons/ski_list_icon-prototype.png'), label: 'Prototyping' },
        ],
        isExpanded: false,
      },
      frontendQA: {
        icon: require('./icons/ski_list_icon-placeholder.png'),
        label: 'Front-end QA',
        relatedSkills: [
          { icon: require('./icons/ski_list_icon-ranorex.png'), label: 'Ranorex Studio Automation' },
          { icon: require('./icons/ski_list_icon-jest.png'), label: 'Snapshot Testing' },
          { icon: require('./icons/ski_list_icon-jira.png'), label: 'Backlog Prioritization' },
        ],
        isExpanded: false,
      },
      marketing: {
        icon: require('./icons/ski_list_icon-marketing.png'),
        label: 'Marketing',
        relatedSkills: [
          { icon: require('./icons/ski_list_icon-email.png'), label: 'Email Campaigns' },
          { icon: require('./icons/ski_list_icon-salesFunnel.png'), label: 'Sales Funnel Optimization' },
          { icon: require('./icons/ski_list_icon-magnifyingGlass.png'), label: 'Primary Market Research' },
        ],
        isExpanded: false,
      },
    }
  }

  render() {
    return Object.keys(this.state).map((skill) => {
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

export default FrontendSkills
