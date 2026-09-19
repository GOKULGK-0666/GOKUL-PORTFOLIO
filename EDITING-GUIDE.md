# Portfolio editing guide

This project keeps editable content in a small number of predictable places.

## Folder map

```text
public/
  assets/
    profile-photo.jpeg       # Main profile photo
    gs-logo.svg              # Browser and mobile tile logo
    project-videos/          # Project demo videos
    project-images/          # Project screenshots and thumbnails
  resume.pdf                 # Resume
src/
  components/                # One file for each portfolio section
  data/portfolio.js          # Skills, certificates, experience, and contact data
  styles.css                 # All site styling
```

## Add or replace the profile photo

Use the exact filename `profile-photo.jpeg`:

```powershell
Copy-Item -LiteralPath "C:\path\to\your-photo.jpg" `
  -Destination ".\public\assets\profile-photo.jpeg" -Force
```

If the source is PNG, keep the same destination filename or update the image path
in `src/components/Hero.jsx`.

## Add a project video

Use a lowercase, readable filename with hyphens. The current project names are:

```text
cyberintel.mp4
e-commerce.mp4
weather-app.mp4
```

Copy a video into the project video folder:

```powershell
Copy-Item -LiteralPath "C:\path\to\weather-demo.mp4" `
  -Destination ".\public\assets\project-videos\weather-app.mp4" -Force
```

Then update the matching `video` value in `src/components/Projects.jsx`:

```js
video: `${import.meta.env.BASE_URL}assets/project-videos/weather-app.mp4`,
```

For a new project, add its title, description, tags, video filename, and real
source-code URL in the same `projects` array.

## Add a project image

Copy screenshots to `public/assets/project-images/`:

```powershell
Copy-Item -LiteralPath "C:\path\to\weather-screenshot.png" `
  -Destination ".\public\assets\project-images\weather-app.png" -Force
```

Use the same lowercase-hyphen naming style as project videos.

## Preview and build

```powershell
npm run client
```

Open `http://localhost:5173` while the client is running. Before publishing,
run:

```powershell
npm run build
```

