export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of
      </textarea>
      <br />
      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" value={100} />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-group">Assignment Group</label>
          </td>
          <label  htmlFor="wd-select-group"></label><br/>
            <select id="wd-select-group">
                <option value="ASSIGNMENTS">Assignments</option>
                <option value="QUIZZES">Quizzes</option>
                <option value="EXAMS">Exams</option>
                <option value="PROJECTS">Projects</option>
            </select>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade-as">Display Grade as</label>
          </td>
          <label  htmlFor="wd-select-display-grade-as"></label><br/>
            <select id="wd-select-display-grade-as">
                <option value="PERCENTAGE">Percentage</option>
                <option value="LETTER">Letter</option>
                <option value="NUMBER">Number</option>
            </select>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <label  htmlFor="wd-select-submission-type"></label><br/>
            <select id="wd-select-submission-type">
                <option value="ONLINE">Online</option>
                <option value="PAPER">Paper</option>
                <option value="EMAIL">Email</option>
            </select>
            <br/>
            <br/>

            <label>Online Entry Options:</label><br/><br/>

            <input type="checkbox" name="check-text-entry" id="wd-text-entry"/>
            <label htmlFor="wd-text-entry">Text Entry</label><br/>

            <input type="checkbox" name="check-website-url" id="wd-website-url"/>
            <label htmlFor="wd-website-url">Website URL</label><br/>

            <input type="checkbox" name="check-media-recordings" id="wd-media-recordings"/>
            <label htmlFor="wd-media-recordings">Media Recordings</label><br/>

            <input type="checkbox" name="check-student-annotation" id="wd-student-annotation"/>
            <label htmlFor="wd-student-annotation">Student Annotation</label><br/>

            <input type="checkbox" name="check-file-upload" id="wd-file-upload"/>
            <label htmlFor="wd-file-upload">File Upload</label><br/>
        </tr>
        <br/>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-assign-to">Assign To</label>
          </td>
          <td>
            <input id="wd-assign-to" value={"Everyone"} />
          </td>
        </tr>
        
        <br/>

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-due-date">Due</label>
          </td>
            <input type="date"
                   value="2024-05-13"
                   id="wd-due-date"/>
        </tr>
        <br/>

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-available-from">Available from</label>
          </td>
            <input type="date"
                   value="2024-05-06"
                   id="wd-available-from"/>
        </tr>

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-available-until">Available until</label>
          </td>
            <input type="date"
                   value="2024-05-20"
                   id="wd-available-until"/>
        </tr>
        <br/>

        <button id="wd-cancel">Cancel</button> 
        <button id="wd-save">Save</button>

      </table>
    </div>
);}
