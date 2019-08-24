# Round Configuration

Information for round configuration is stored in `roundData.js` inside the `roundData` object.

Each round is stored in the `rounds` array, and must have the following fields:

- `type`: Whether the round is a FaceMash round (`'faceMash'`) or an interview round (`'interview'`).
- `name`: The name of the round (e.g. `'FaceMash'` or `'Mass Interview'`)
- `scored`: Whether sections in the interview would be scored.

## FaceMash

No additional information is required for FaceMash round configuration.

## Interviews

Interview rounds must contain a `sections` field, which is an array of `section` objects.

### Each `section` must contain the following fields

- `title`
- `type`: Whether the interviewer input is through a dropdown (`'dropdown'`), a set of multiple-choice-like buttons (`'multiple choice'`), or only through notes (`'notes'`)
- `response`: An empty object which will store all interviewer input in the following fields (does not need to be configured in this file):
  - `score`: The score given to the interviewee on the section
  - `text`: If the options presented in the question are text only, the chosen option will be stored here
  - `notes`: Any notes put down by the interviewer

#### If the `type` is `'dropdown'` or `'multiple choice'`, at least one of the following fields must be provided

- `scoreOptions`: The available options for scoring on this section
- `textOptions`: The available classifications on this section

If only `scoreOptions` is provided or both `scoreOptions` and `textOptions` are provided, then the question is scored and `response.score` will be updated.
If only `textOptions` is provided, `response.text` will be updated.

If you'd like to add a custom dropdown prompt, use the field `dropdownPrompt`

### Optional Fields

- `notesPrompt`: The placeholder string in the notes box. Must be formatted as a string and must be present for the section to have a notes box.
- **The following two fields, if provided, may include JSX elements for styling on the cards.**
  - `description`: Appears just below the title
  - `prompt`: Appears below the description and above scoring/classification options
