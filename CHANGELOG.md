# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2023-08-06

## Added

- Added event system for better DX

### Fixed

- Fixed regex for short youtube links so it embeds them even with `t=<number>s` parameter

## [1.1.1] - 2023-08-06

### Fixed

- Fixed a bug where the chat would pause when injected video/image appeared in the chat
- Fixed a bug where chat wouldn't be scrolled to the bottom initially when there were injected videos/images in the chat

### Changed

- Changed youtube link regex to include `t=<number>s` parameter to allow embedding of videos with specific start time
- Changed size of the video thumbnail to reduce black bars

## [1.1.0] - 2023-07-29

### Added

- Added 'display videos' which gives basic info about linked video (from streamable/youtube) directly in the chat
- Added option to hide 'top gifters' from the chat
- Added option to hide 'quick emote holder' from the chat
- Added generic function for grabbing elements from the page

### Changed

- Changed settings-manager to be more bullet proof
- Changed file structure and naming for a better DX

## [1.0.0] - 2023-07-20

### Added

- Added modal with extension settings
- Added 'display images' and 'blur images' in chat options
- Added extension information in settings
- Added implemantations of both 'display images' and 'blur images' options
- Added saving of the settings in localStorage
- Added [shadcn](https://ui.shadcn.com/docs) components
