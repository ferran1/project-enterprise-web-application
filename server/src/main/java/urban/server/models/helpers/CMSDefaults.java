package urban.server.models.helpers;

import urban.server.models.CMS;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;


/**
 * @Doel
 * @Author Jesse van Bree
 */
public class CMSDefaults {
    private List<CMS> defaults;
    private String[] locations;


    public CMSDefaults() {
        this.defaults = new ArrayList<>();

        /// Landing page
        this.defaults.add(new CMS("LANDING_TITLE", "landing", "landing", "Dataset visualization tool of Empower 2.0", "Title in landing page text block"));
        this.defaults.add(new CMS("LANDING_INFO", "landing", "landing",
                "This tool organizes and visualizes data about csv and pdf type files into datasets. CSV type files are converted into charts and pdf type files can be viewed directly from the website. In addition to that registered users can share their datasets with other users. This tool was built for the Empower 2.0 project. " +
                        "EMPOWER 2.0 is the abbreviation of Empowering the citizens - Towards European Energy Market 2.0 (Enabling More People’s Ownership in Energy transition). The project aims to demonstrate and accelerate the empowerment of citizens to become active energy citizens - and to create local energy communities via existing civil society structures - through development of new solutions (e.g. organisational) and adoption of new, emerging and existing solutions for energy ownership. This will lead to an increase of energy awareness and renewable energy production, and hence reduce the environmental footprint in the North Sea Region."
        , "Text in landing page text block"));
        this.defaults.add(new CMS("LANDING_BUTTON", "landing", "landing","Explore", "Button text in landing page button"));

        // navbar
        this.defaults.add(new CMS("NAV_HOME", "navbar", "navbar", "Home", "Home page link in navbar"));
        this.defaults.add(new CMS("NAV_MY_UPLOADS", "navbar", "navbar", "My uploads", ""));
        this.defaults.add(new CMS("NAV_PROFILE", "navbar", "navbar", "Profile", ""));
        this.defaults.add(new CMS("NAV_ORG_PANEL", "navbar", "navbar", "Organisation panel", ""));
        this.defaults.add(new CMS("NAV_ADMIN", "navbar", "navbar", "Admin panel", ""));
        this.defaults.add(new CMS("NAV_LOG_IN", "navbar", "navbar", "Log in", ""));
        this.defaults.add(new CMS("NAV_LOG_OUT", "navbar", "navbar", "Log out", ""));

        // Home
        this.defaults.add(new CMS("HOME_SEARCH", "home", "home_overview", "Search by year, name or description", ""));
        this.defaults.add(new CMS("HOME_REGION_FILTER", "home", "home_overview", "Region filter", ""));
        this.defaults.add(new CMS("HOME_PUBLICITY_FILTER", "home", "home_overview", "Publicity filter", ""));
        this.defaults.add(new CMS("HOME_FILTER_BUTTON", "home", "home_overview", "Filter", ""));
        this.defaults.add(new CMS("HOME_LIST_TITLE", "home", "home_overview", "Datasets", ""));

        // TODO: add filter options to CMS

        this.defaults.add(new CMS("HOME_CHART_TITLE", "home", "home_detail", "Dataset visualization", ""));
        this.defaults.add(new CMS("HOME_CHART_DOWNLOAD", "home", "home_detail", "Download", ""));
        this.defaults.add(new CMS("HOME_DETAIL_TITLE", "home", "home_detail", "Dataset visualization", ""));
        this.defaults.add(new CMS("HOME_DETAIL_NAME", "home", "home_detail", "Name", ""));
        this.defaults.add(new CMS("HOME_DETAIL_DESC", "home", "home_detail", "Description", ""));
        this.defaults.add(new CMS("HOME_DETAIL_REGION", "home", "home_detail", "Region", ""));
        this.defaults.add(new CMS("HOME_DETAIL_PUBLICITY", "home", "home_detail", "Publicity", ""));
        this.defaults.add(new CMS("HOME_DETAIL_YEAR", "home", "home_detail", "Year", ""));
        this.defaults.add(new CMS("HOME_DETAIL_BY", "home", "home_detail", "Uploaded by", ""));
        // TODO: add placeholder cms values

        // My uploads
        this.defaults.add(new CMS("MY_UPLOADS_TITLE", "my_uploads", "my_uploads", "My uploaded datasets", ""));
        this.defaults.add(new CMS("MY_UPLOADS_NO_UPLOADS", "my_uploads", "my_uploads", "You don't have any uploaded datasets", ""));
        this.defaults.add(new CMS("MY_UPLOADS_UPLOAD_BUTTON", "my_uploads", "my_uploads", "Upload dataset", ""));
        this.defaults.add(new CMS("MY_UPLOADS_DL_HOVER", "my_uploads", "my_uploads", "Download dataset file", ""));
        this.defaults.add(new CMS("MY_UPLOADS_VIEW_HOVER", "my_uploads", "my_uploads", "View this dataset", ""));
        this.defaults.add(new CMS("MY_UPLOADS_EDIT_HOVER", "my_uploads", "my_uploads", "Edit this dataset", ""));
        this.defaults.add(new CMS("MY_UPLOADS_DEL_HOVER", "my_uploads", "my_uploads", "Delete this dataset", ""));

        // Upload-popup
        this.defaults.add(new CMS("UPLOAD_POPUP_CHART_INFO", "upload-popup", "upload-popup", "Configure your chart so that it uses the headers from the file you would like\n" +
                "                  to visualize. A chart generally defines what is being measured in the x-axis and the y-axis\n" +
                "                  defines how much of what is being measured. The configuration allows a maximum of two x-axes-e.g., " +
                "to display the region and year data in the same x-axis.\n", ""));


        // Profile
        this.defaults.add(new CMS("PROFILE_FIRSTNAME_EDIT", "profile", "profile", "Firstname", ""));
        this.defaults.add(new CMS("PROFILE_SURNAME_EDIT", "profile", "profile", "Surname", ""));
        this.defaults.add(new CMS("PROFILE_UPDATE_BUTTON", "profile", "profile", "Update", ""));
        this.defaults.add(new CMS("PROFILE_UPDATE_COUNT", "profile", "profile", "Uploads: ", ""));

        // Organisation panel
        this.defaults.add(new CMS("ORG_PANEL_NO_ORGANISATION_MSG", "org_panel", "org_panel", "You are not part of any organisation", ""));
        this.defaults.add(new CMS("ORG_PANEL_NO_ORGANISATION_BTN", "org_panel", "org_panel", "Back to the homepage", ""));

        // Admin panel
        //TODO: ADD ADMIN PANEL CMS VALUES

        // Login panel
        this.defaults.add(new CMS("LOGIN_TITLE", "log_in", "log_in", "Login", ""));
        this.defaults.add(new CMS("LOGIN_EMAIL", "log_in", "log_in", "Email", ""));
        this.defaults.add(new CMS("LOGIN_PASSWORD", "log_in", "log_in", "Password", ""));
        this.defaults.add(new CMS("LOGIN_BUTTON", "log_in", "log_in", "Login", ""));
        this.defaults.add(new CMS("LOGIN_FORGET", "log_in", "log_in", "Forgot password?", ""));

        // Admin panel
        //TODO: ADD CMS VALUES FOR CRUD MODALS

        this.locations = new String[]{
                "LANDING_TITLE",
                "LANDING_INFO",
                "LANDING_BUTTON",
                "NAV_HOME",
                "NAV_MY_UPLOADS",
                "NAV_PROFILE",
                "NAV_ORG_PANEL",
                "NAV_ADMIN",
                "NAV_LOG_IN",
                "NAV_LOG_OUT",
                "HOME_SEARCH",
                "HOME_REGION_FILTER",
                "HOME_PUBLICITY_FILTER",
                "HOME_FILTER_BUTTON",
                "HOME_LIST_TITLE",
                "HOME_CHART_TITLE",
                "HOME_CHART_DOWNLOAD",
                "HOME_DETAIL_TITLE",
                "HOME_DETAIL_NAME",
                "HOME_DETAIL_DESC",
                "HOME_DETAIL_REGION",
                "HOME_DETAIL_PUBLICITY",
                "HOME_DETAIL_YEAR",
                "HOME_DETAIL_BY",
                "MY_UPLOADS_TITLE",
                "MY_UPLOADS_NO_UPLOADS",
                "MY_UPLOADS_UPLOAD_BUTTON",
                "MY_UPLOADS_DL_HOVER",
                "MY_UPLOADS_VIEW_HOVER",
                "MY_UPLOADS_EDIT_HOVER",
                "MY_UPLOADS_DEL_HOVER",
                "UPLOAD_POPUP_CHART_INFO",
                "PROFILE_FIRSTNAME_EDIT",
                "PROFILE_SURNAME_EDIT",
                "PROFILE_UPDATE_BUTTON",
                "PROFILE_UPDATE_COUNT",
                "ORG_PANEL_NO_ORGANISATION_MSG",
                "ORG_PANEL_NO_ORGANISATION_BTN",
                "LOGIN_TITLE",
                "LOGIN_EMAIL",
                "LOGIN_PASSWORD",
                "LOGIN_BUTTON",
                "LOGIN_FORGET"
        };
    }

    @Override
    public String toString() {
        return defaults.stream().map(CMS::getLocation).collect(Collectors.joining("\",\n\""));
    }

    public List<CMS> getDefaults() {
        return defaults;
    }

    public String[] getLocations() {
        return locations;
    }

}
