import React, { Component } from 'react'
import './AdamHobbies.css'

const optionsPrimary = [
  { label: 'Back', source: require('./icons/hob_back.png') },
  { label: 'Forward', source: require('./icons/hob_forward.png') },
  { label: 'Reload', source: require('./icons/hob_reload.png') },
  { label: 'Home', source: require('./icons/hob_home.png') },
  { label: 'Search', source: require('./icons/hob_search.png') },
  { label: 'Netscape', source: require('./icons/hob_netscape.png') },
  { label: 'Print', source: require('./icons/hob_print.png') },
  { label: 'Security', source: require('./icons/hob_security.png') },
  { label: 'Shop', source: require('./icons/hob_shop.png') },
  { label: 'Stop', source: require('./icons/hob_stop.png') },
]

class AdamHobbies extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shouldTooltipDisplay: false,
    }
  }

  // Tooltip for Adam Navigator Icon
  toggleBonusTooltip() {
    this.setState({ shouldTooltipDisplay: !this.state.shouldTooltipDisplay })
  }

  render() {
    return (
      <div id="ah_wrapper">
        <div className="ah_menu">
          <div className="ah_menu-button"><u>F</u>ile</div>
          <div className="ah_menu-button"><u>E</u>dit</div>
          <div className="ah_menu-button"><u>V</u>iew</div>
          <div className="ah_menu-button"><u>I</u>nsert</div>
          <div className="ah_menu-button">F<u>o</u>rmat</div>
          <div className="ah_menu-button"><u>T</u>ools</div>
          <div className="ah_menu-button">T<u>a</u>ble</div>
          <div className="ah_menu-button"><u>W</u>indow</div>
          <div className="ah_menu-button"><u>H</u>elp</div>
        </div>
        <div id="ah_menuMain-wrapper">
          <img
            src={require('./icons/hob_lineBig.png')}
            alt=""
          />
          <div id="ah_menuMain">
            {optionsPrimary.map(item => (
              <div
                className="ah_menu-largeButton"
                key={item.label}
              >
                <img
                  src={item.source}
                  alt=""
                />
                {item.label}
              </div>
            ))}
          </div>
          <div id="ah_menu-endLogo">
            <img
              className="ah_menu-logoIcon"
              src={require('./icons/hob_logo.png')}
              alt=""
              onMouseOver={() => this.toggleBonusTooltip()}
              onMouseOut={() => this.toggleBonusTooltip()}
              onFocus={() => this.toggleBonusTooltip()}
              onBlur={() => this.toggleBonusTooltip()}
            />
          </div>
        </div>
        <div
          className={this.state.shouldTooltipDisplay === true
            ? 'bonus_tooltip-on'
            : 'bonus_tooltip-off'}
        >
          Adam Navigator
        </div>
        <div id="ah_content">
          <img
            id="ah_banner"
            src={require('./images/adam.gif')}
            alt="Adam's Website Banner"
          />
          <hr width="75%" />
          <div className="ah_section">
            <div className="ah_section-wrapper">
              <div className="ah_section-heading">
                <img
                  className="ah_torch"
                  src={require('./images/retroTorch.gif')}
                  alt="Retro Torch"
                />
                BIO
              </div>
              <div className="ah_section-photoRight">
                <img
                  className="ah_adamPhoto"
                  src={require('./images/adamPhoto.jpg')}
                  alt="Adam at Christmas"
                />
              </div>
              <p>
                Hello, my name is Adam Mackintosh.
                Welcome to my website.
                I was born on Vancouver Island and have lived here my whole life.
                I have been interested in computers since a young age.
                I am passionate about physics, economics, philosophy, and marketing.
              </p>
              <div className="ah_section-heading cleared">
                <img
                  className="ah_torch"
                  src={require('./images/retroTorch.gif')}
                  alt="Retro Torch"
                />
                EARLY YEARS
              </div>
              <div className="ah_section-photoLeft">
                <img
                  className="ah_adamPhoto"
                  src={require('./images/adamEarlyYears.png')}
                  alt="Windows 98 Pixelated Graphic"
                />
              </div>
              <p>
                As a child, I learned how to use a computer at my friend's
                house where he had a Windows 95 computer but no mouse.
                My first computer was a Pentium 100 which had a 100 Megahertz CPU with 24 Megabytes
                of RAM and a 200 Megabyte Hard Disk.
                Back in secondary school, pre-2000, my friend and I used to run unix-based machines
                and operate IRC networks. This was when I was first exposed to Linux and FreeBSD
                and saw the power of the command line.
                Such upbringing has made me conscious of computer
                internals and component-based architectures.
                Back when I used to moderate IRC networks and channels using mIRC Client
                for Windows, I used to program event-based scripts because mIRC
                had its own language built in.
                I used to like making themes and customizing things.
                My passion for computers and programming has continued to grow since then.
              </p>

              <div id="contactInfo-wrapper">
                <div id="contactInfo">
                  <img
                    className="ah_torch-contact"
                    src={require('./images/retroTorch.gif')}
                    alt="Retro Torch"
                  />
                  <div className="contactInfo-heading">CONTACT INFO</div>
                  <div className="contactInfo-row">
                    <div className="contactInfo-label">Phone:</div>
                    <div className="contactInfo-value">(250) 734-3454</div>
                  </div>
                  <div className="contactInfo-row">
                    <div className="contactInfo-label">Email:</div>
                    <div className="contactInfo-value">adam@adammackintosh.net</div>
                  </div>
                  <div className="contactInfo-row">
                    <div className="contactInfo-label">Fax:</div>
                    <div className="contactInfo-value">Deprecated</div>
                  </div>
                </div>
              </div>
              <div id="counter">
                <img
                  src={require('./images/counter.gif')}
                  alt="Faux Page Counter"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AdamHobbies
