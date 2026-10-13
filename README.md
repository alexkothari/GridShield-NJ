GridShield NJ

Proactive power outage preparedness for New Jersey communities.

GridShield NJ is a mobile application designed to help New Jersey residents prepare for power outages and severe weather. It combines live weather alerts, location-aware emergency resources, outage risk assessments, and offline-accessible information in one place.

The project focuses on community resilience, emergency preparedness, and helping residents access important resources when severe weather disrupts everyday life.

Project status: Public development project — initial GitHub release.

Important: GridShield NJ is a preparedness tool, not an official emergency alert system. Risk assessments are estimates, and the availability or accuracy of individual resources may change. Always follow instructions from official emergency management authorities and contact emergency services when necessary.

Features

Weather Alerts and Outage Risk

* Retrieves active weather alerts from the National Weather Service (NWS).
* Calculates a rule-based risk assessment using weather alert information.
* Displays risk information to help users prepare for potential disruptions.
* Maintains locally stored risk history for reference.
* Supports background tasks and local notifications for relevant risk changes.

Risk assessments use a custom rules-based calculation.

Local Emergency Resources

* Location-aware access to local emergency and utility contacts.
* Support for all 39 municipalities in Morris County, New Jersey.
* Manual town selection when GPS access is unavailable or when a user wants to view another municipality.
* Quick access to available contact information, including calling and messaging options.

Medical Emergency Triage

Includes a guided medical triage screen intended to help users navigate emergency-related decisions.

This feature is informational and does not replace professional medical advice, emergency dispatchers, or emergency services.

Cooling and Warming Centers

Provides a map-based directory of selected cooling and warming locations, with directions available through mapping applications.

Tree Removal Resources

Provides a directory of tree removal companies to help users identify potential assistance following storms.

Road Conditions

Provides access to live road incident and closure information through the official 511NJ website.

Emergency Contact PDF

Generates a shareable emergency preparedness document containing information such as:

* Utility and emergency contacts.
* Tree removal contacts.
* A power outage checklist.
* Food safety guidance for refrigerated and frozen food during an outage.

Users can review and share the generated PDF from within the application.

Offline-First Local Storage

Uses SQLite to persist selected information locally, including contacts and risk history.

This helps preserve access to stored information when connectivity is unavailable. However, live weather alerts, embedded road conditions, and other online resources may not be accessible without an internet connection.

Technology Stack

GridShield NJ is built with:

* React Native — Cross-platform mobile application framework.
* Expo SDK 54 — Native development and application tooling.
* React Navigation — Screen navigation.
* Expo SQLite — Local database and persistence.
* Expo Location — Device location and location-related functionality.
* Expo Notifications — Local notifications.
* Expo Background Task and Task Manager — Background task functionality.
* Expo Print and File System — Emergency PDF generation and file handling.
* React Native Maps — Shelter map interface.
* React Native WebView — Embedded road conditions and PDF viewing.
* National Weather Service API — Public weather alert data.

The application uses the public National Weather Service API for weather alerts and does not require an API key for that endpoint.

Project Structure

The repository contains the primary application screens, supporting modules, and native project files.

File or directory	Purpose
* App.js	Application entry point and navigation configuration.
* DirectoryScreen.js	Main screen containing risk information, contacts, and emergency resources.
* RiskDetailScreen.js	Additional explanation of the risk assessment.
* CheckLogScreen.js	Risk and check history interface.
* TriageScreen.js	Medical triage interface.
* ShelterScreen.js	Cooling and warming center map.
* TreeCompanyScreen.js	Tree removal resource directory.
* RoadClosureScreen.js	Embedded road conditions information.
* TownSelectScreen.js	Manual municipality selection.
* PdfViewScreen.js	Emergency PDF viewing interface.
* weather.js	Weather alert retrieval and risk calculation.
* database.js	SQLite initialization and local data management.
* location.js	Location handling and municipality-related data.
* municipalUtilities.js	Municipal utility information.
* notifications.js	Local notification functionality.
* backgroundTask.js	Background task registration.
* pdfExport.js	Emergency PDF generation.
* shelters.js	Shelter information.
* treeCompanies.js	Tree removal company information.
* styles.js	Shared application styling.
* app.json	Expo application configuration.
* package.json	Dependencies and project scripts.
* ios/	Native iOS project files.
* android/	Native Android project files.
* assets/	Application assets.

Getting Started

These instructions are intended for developers who want to inspect, modify, or run the project locally.

Prerequisites

You’ll need:

* Git.
* Node.js and npm.
* A compatible development environment for Expo SDK 54.
* Xcode and the required Apple development tools for local iOS builds on macOS.
* Android Studio and the Android SDK for local Android builds.
* A compatible physical device or simulator/emulator.

Important: GridShield NJ uses native modules and a custom Expo development client. Expo Go is not the supported development environment for the current configuration.

1. Clone the repository

Open a terminal and run:

git clone https://github.com/alexkothari/GridShield-NJ.git
cd GridShield-NJ

2. Install dependencies

Install the project’s JavaScript dependencies:

npm install

The repository includes package-lock.json to help keep dependency installations consistent.

3. Run the application

The project defines commands for launching native iOS and Android builds.

For iOS:

npm run ios

For Android:

npm run android

These commands use Expo’s native run commands to build and launch the application in the corresponding development environment.

For iOS, you’ll need a compatible macOS development environment with Xcode configured. For Android, you’ll need Android Studio and the appropriate Android development tools.

4. Start the development server

To start the Expo development server, run:

npx expo start --dev-client

This starts the server for a custom development client.

If you’re using a physical device, ensure it can communicate with the development computer. Depending on your network configuration, you may need to scan the development QR code or enter the development server address manually.

If the native application has not yet been built and installed, follow the platform-specific setup requirements before attempting to launch it.

Data Sources and Connectivity

Weather Alerts

GridShield NJ retrieves active weather alerts from the National Weather Service:

* API endpoint: https://api.weather.gov/alerts/active

Weather alert availability depends on network connectivity and the external service.

Road Conditions

Road condition information is provided through the official 511NJ website:

* Website: https://511nj.org/

The embedded road conditions page may require users to select Morris County manually.

Location

The application can use device location to determine a municipality. Users can also select a municipality manually when location access is denied or unavailable.

Location access should be granted only when desired. Exact behavior depends on the device’s permission settings and application configuration.

Local Data

SQLite stores selected information on the device.

Offline availability does not mean every application feature works offline. Live weather data, road conditions, and other network-dependent services may be unavailable during an outage.

Current Limitations

GridShield NJ is an active development project.

Current limitations include:

* The user interface and overall experience may undergo further refinement.
* Native production builds and public mobile distribution require additional setup.
* Resource information can become outdated and should be independently verified.

The application should not be the sole source of information during an emergency.

Roadmap

Planned development includes:

* Expanding verified shelter information across NJ.
* Expanding the tree removal directory.
* Further user interface and accessibility improvements.
* Refining application branding and metadata.
* Configuring production build and distribution workflows.
* Preparing for broader testing and potential mobile app-store distribution.

These items are planned work, not commitments to specific release dates.

Contributing

Suggestions, bug reports, and contributions are welcome.

To propose a change:

1. Fork the repository.
2. Create a branch for your work.
3. Make and test your changes.
4. Commit your changes with a descriptive message.
5. Push your branch and open a pull request.

For bug reports, include the device or simulator, relevant steps to reproduce the issue, and any error messages that can be shared safely.

Please do not include private information, credentials, API secrets, or sensitive location data in issues or pull requests.

License

A license has not yet been established in this documentation.

Until a license is added to the repository, do not assume that the source code is available for unrestricted reuse, modification, or redistribution.

Contact and Issues

For project questions, feature suggestions, or bug reports, visit the repository:

https://github.com/alexkothari/GridShield-NJ
