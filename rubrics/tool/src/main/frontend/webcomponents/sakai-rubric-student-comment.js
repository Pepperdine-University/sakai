import {SakaiElement} from "/webcomponents/sakai-element.js";
import {html} from "/webcomponents/assets/lit-element/lit-element.js";
import {unsafeHTML} from "/webcomponents/assets/lit-html/directives/unsafe-html.js";
import {tr} from "./sakai-rubrics-language.js";

export class SakaiRubricStudentComment extends SakaiElement {

  static get properties() {
    return { criterion: { type: Object } };
  }

  render() {

    return html`
      <div class="comment-icon fa fa-2x fa-comments ${this.criterion.comments ? "active": ""}" @click="${this.toggleComment}" title="${tr("criterion_comment_student")}"></div>

      <!-- popover -->
      <div id="criterion-comment-viewer-${this.criterion.id}" class="popover criterion-edit-popover left">
        <div class="arrow"></div>
        <div class="popover-title" style="display: flex;">
          <div style="flex: auto;">
            <label class="criterion-title" for="">
              <sr-lang key="comment_for_criterion" values="${JSON.stringify([this.criterion.title])}" />
            </label>
          </div>
          <div class="buttons" style="flex: 0;">
            <button class="btn btn-primary btn-xs done" @click="${this.toggleComment}"><sr-lang key="done" /></button>
          </div>
        </div>
        <div class="popover-content">
          <p class="renderComment">${unsafeHTML(this.criterion.comments)}</p>
        </div>
      </div>
    `;
  }

  toggleComment(e) {

    e.stopPropagation();
    e.preventDefault();

    var popover = $(`#criterion-comment-viewer-${this.criterion.id}`);

    if (!this.classList.contains("show-tooltip")) {

      this.classList.add('show-tooltip');

      rubrics.css(popover[0], {
        'left': e.target.offsetLeft - 270 + "px",
        'top': (e.target.offsetTop + e.target.offsetHeight/2 - popover.height()/2) + "px",
      });
      popover.show();
    } else {
      this.classList.remove('show-tooltip');
      popover.hide();
    }
  }
}

customElements.define("sakai-rubric-student-comment", SakaiRubricStudentComment);
