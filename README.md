# Graduation Invitation Project

This project is a graduation invitation webpage designed to celebrate and invite guests to a graduation ceremony. It includes various sections to provide all necessary information to the invitees.

## Project Structure

The project is organized as follows:

```
graduation-invitation
├── src
│   ├── assets
│   │   ├── fonts          # Directory for font files
│   │   └── images         # Directory for image files (invitee's image and graphics)
│   ├── css
│   │   ├── main.css       # Main styles for layout and typography
│   │   ├── sections
│   │   │   ├── header.css  # Styles for the header section
│   │   │   ├── details.css # Styles for the RSVP & Info section
│   │   │   ├── gallery.css # Styles for the schedule section
│   │   │   └── rsvp.css    # Styles for the RSVP form
│   │   └── reset.css      # Resets default browser styles
│   ├── js
│   │   ├── main.js        # Main JavaScript for interactivity
│   │   ├── rsvp.js        # JavaScript for managing the RSVP form
│   │   └── gallery.js      # JavaScript for handling the schedule display
│   └── index.html         # Main HTML file for the project
├── package.json            # npm configuration file
└── README.md               # Documentation for the project
```

## Features

- **Header Section**: Introduces the invitee with a personal touch and includes an image.
- **RSVP & Info Section**: Provides details about the event, including the address and time, along with an RSVP form.
- **Schedule Section**: Displays a timeline of events related to the graduation ceremony.
- **Responsive Design**: The webpage is designed to be responsive and accessible on various devices.

## Setup Instructions

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the necessary dependencies using npm:
   ```
   npm install
   ```
4. Open `src/index.html` in your web browser to view the graduation invitation page.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is open-source and available under the MIT License.