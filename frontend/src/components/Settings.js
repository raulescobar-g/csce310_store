import React from "react";
import ReactDOM from "react-dom";
import {SettingsPane, SettingsPage, SettingsContent, SettingsMenu} from 'react-settings-pane'
import "./Settings.css";
import Discounts from "./discountSettings/Discounts";

export default class Settings extends React.Component {
    constructor(props) {
      super(props);
  
      // You will maybe receive your settings from this.props or do a fetch request in your componentWillMount
      // but here is an example of how it should look like:
      this.state = {
        // "mysettings.general.name": "Dennis Stücken",
        // "mysettings.general.firstname": "Dennis",
        // "mysettings.general.lastname": "Stücken",
        // "mysettings.general.username": "dstuecken",
        // "mysettings.general.color-theme": "purple",
        // "mysettings.general.email": "dstuecken@react-settings-pane.com",
        // "mysettings.general.picture": "earth",
        // "mysettings.general.password": "password",
        "mysettings.profile.firstname": "Dennis",
        "mysettings.profile.lastname": "Stücken"
      };

      fetch('http://localhost:5000/users/getuser/1')
        .then(response => response.json())
        .then(data => {
          this.setState({ 
            "mysettings.general.firstname": data[0].firstname,
            "mysettings.general.lastname": data[0].lastname,
            "mysettings.general.email": data[0].email,
            "mysettings.general.password": data[0].password })
            });
  
      // Save settings after close
      this._leavePaneHandler = (wasSaved, newSettings, oldSettings) => {
        // "wasSaved" indicates wheather the pane was just closed or the save button was clicked.
  
        if (wasSaved && newSettings !== oldSettings) {
          // do something with the settings, e.g. save via ajax.
          this.setState(newSettings);
          fetch("http://localhost:5000/users/updateinfo/1", {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
              "newFirstname" : newSettings["mysettings.general.firstname"],
              "newLastname" : newSettings["mysettings.general.lastname"],
              "newEmail" : newSettings["mysettings.general.email"],
              "newPassword" : newSettings["mysettings.general.password"]})
          })
          .then(response => response.json())
        }
  
        this.hidePrefs();
      };
  
      // React if a single setting changed
      this._settingsChanged = ev => {};
  
      // Define your menu
      this._menu = [
        {
          title: "General", // Title that is displayed as text in the menu
          url: "/settings/general" // Identifier (url-slug)
        },
        {
          title: "Profile",
          url: "/settings/profile"
        },
        {
          title: "Notifications",
          url: "/settings/notifications"
        },
        {
          title: "Language",
          url: "/settings/language"
        },
        {
          title: "Discount Codes",
          url: "/settings/discounts"
        },
        {
          title: "Plugins",
          url: "/settings/plugins"
        },
        {
          title: "About",
          url: "/settings/about"
        }
      ];
    }
  
    hidePrefs() {
      this.prefs.className = "md-modal";
      this.overlay.style.visibility = "";
    }
  
    showPrefs() {
      this.prefs.className = "md-modal show";
      this.overlay.style.visibility = "visible";
    }
  
    render() {
      // Get settings
      let settings = this.state;
  
      // Define one of your Settings pages
      /*
       const dynamicOptionsForGeneralPage = [
         {
           key: null
           label: 'Account',
           type: 'headline',
         },
         {
           key: 'mysettings.general.email',
           label: 'E-Mail address',
           type: 'text',
         },
         {
           key: 'mysettings.general.password',
           label: 'Password',
           type: 'password',
         },
         {
           key: 'mysettings.general.password-repeat',
           label: 'Password repeat',
           type: 'password',
         },
         {
           key: null,
           label: 'Appearance',
           type: 'headline',
         },
         {
           key: 'mysettings.general.color-theme',
           label: 'Color Theme',
           type: 'custom',
           component: <select><option value="blue">Blue</option><option value="red">Red</option></select>,
         }
       ];
       // Then use with:
       // <SettingsPage handler="/settings/general" options={dynamicOptionsForGeneralPage} />
       */
  
      // Return your Settings Pane
      return (
        <div>
        {/* <div style = {{height:"85vh"}}></div> */}
          <div className="page-header">
            <h1>
              react-settings-pane <small>Example</small>
            </h1>
          </div>
          <div style={{ margin: "30px 0 90px 0" }}>
            <button
              onClick={this.showPrefs.bind(this)}
              className="btn btn-default"
            >
              Show Settings
            </button>
          </div>
          {/* <p>
            <h4>Result</h4>
            <pre className="well">{JSON.stringify(settings, null, 4)}</pre>
          </p>
          <div ref={ref => (this.overlay = ref)} className="overlay" />
         */}
          {/* <div className="md-modal show"> */}
          <div ref={ref => (this.prefs = ref)} className="md-modal show">
            <SettingsPane
              items={this._menu}
              index="/settings/general"
              settings={settings}
              onChange={this._settingsChanged}
              onPaneLeave={this._leavePaneHandler}
            >
              <SettingsMenu headline="General Settings" />
              <SettingsContent header>
                <SettingsPage handler="/settings/general">
                  {/* <fieldset className="form-group">
                    <label htmlFor="generalName">Name: </label>
                    <input
                      type="text"
                      className="form-control"
                      name="mysettings.general.name"
                      placeholder="Name"
                      id="generalName"
                      onChange={this._settingsChanged}
                      defaultValue={settings["mysettings.general.name"]}
                    />
                  </fieldset> */}
                  <fieldset className="form-group">
                    <label htmlFor="generalName">First Name: </label>
                    <input
                      type="text"
                      className="form-control"
                      name="mysettings.general.firstname"
                      placeholder="First name"
                      id="generalFirstName"
                      onChange={this._settingsChanged}
                      defaultValue={settings["mysettings.general.firstname"]}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <label htmlFor="generalName">Last Name: </label>
                    <input
                      type="text"
                      className="form-control"
                      name="mysettings.general.lastname"
                      placeholder="Last name"
                      id="generalLastName"
                      onChange={this._settingsChanged}
                      defaultValue={settings["mysettings.general.lastname"]}
                    />
                  </fieldset>
                  
                  {/* <fieldset className="form-group">
                    <label htmlFor="generalUsername">Username: </label>
                    <div className="input-group">
                      <span className="input-group-addon" id="basic-addon1">
                        @
                      </span>
                      <input
                        type="text"
                        name="mysettings.general.username"
                        className="form-control"
                        placeholder="Username"
                        aria-describedby="basic-addon1"
                        onChange={this._settingsChanged}
                        defaultValue={settings["mysettings.general.username"]}
                      />
                    </div>
                  </fieldset> */}
                  <fieldset className="form-group">
                    <label htmlFor="generalMail">E-Mail address: </label>
                    <input
                      type="text"
                      className="form-control"
                      name="mysettings.general.email"
                      placeholder="E-Mail Address"
                      id="generalMail"
                      onChange={this._settingsChanged}
                      defaultValue={settings["mysettings.general.email"]}
                    />
                  </fieldset>
                  {/* <fieldset className="form-group">
                    <label htmlFor="generalPic">Picture: </label>
                    <input
                      type="text"
                      className="form-control"
                      name="mysettings.general.picture"
                      placeholder="Picture"
                      id="generalPic"
                      onChange={this._settingsChanged}
                      defaultValue={settings["mysettings.general.picture"]}
                    />
                  </fieldset> */}
                  <fieldset className="form-group">
                    <label htmlFor="generalPassword">Password: </label>
                    <input
                      type="text"
                      className="form-control"
                      name="mysettings.general.password"
                      placeholder="Password"
                      id="generalPassword"
                      onChange={this._settingsChanged}
                      defaultValue={settings["mysettings.general.password"]}
                    />
                  </fieldset>
                  {/* <fieldset className="form-group">
                    <label htmlFor="profileColor">Color-Theme: </label>
                    <select
                      name="mysettings.general.color-theme"
                      id="profileColor"
                      className="form-control"
                      defaultValue={settings["mysettings.general.color-theme"]}
                    >
                      <option value="blue">Blue</option>
                      <option value="red">Red</option>
                      <option value="purple">Purple</option>
                      <option value="orange">Orange</option>
                    </select>
                  </fieldset> */}
                </SettingsPage>
                <SettingsPage handler="/settings/profile">
                  <fieldset className="form-group">
                    <label htmlFor="profileFirstname">Firstname: </label>
                    <input
                      type="text"
                      className="form-control"
                      name="mysettings.profile.firstname"
                      placeholder="Firstname"
                      id="profileFirstname"
                      onChange={this._settingsChanged}
                      defaultValue={settings["mysettings.profile.firstname"]}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <label htmlFor="profileLastname">Lastname: </label>
                    <input
                      type="text"
                      className="form-control"
                      name="mysettings.profile.lastname"
                      placeholder="Lastname"
                      id="profileLastname"
                      onChange={this._settingsChanged}
                      defaultValue={settings["mysettings.profile.lastname"]}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <label htmlFor="profileBiography">Biography: </label>
                    <textarea
                      className="form-control"
                      name="mysettings.profile.biography"
                      placeholder="Biography"
                      id="profileBiography"
                      onChange={this._settingsChanged}
                      defaultValue={settings["mysettings.profile.biography"]}
                    />
                  </fieldset>
                </SettingsPage>
                <SettingsPage handler="/settings/discounts">
                  <Discounts/>
                </SettingsPage>
              </SettingsContent>
            </SettingsPane>
          </div>
        //   </div>
      );
    }
  }