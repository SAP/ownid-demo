import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { INote } from '../../../app.store';
import { SaveNoteCommand } from '../commands/save-note.command';

@Component({
  selector: 'note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteEditComponent implements OnChanges {

  @Input() note: INote | null = null;

  noteBody: string | undefined;

  private timeoutId: NodeJS.Timeout | undefined;

  constructor(private saveNoteCommand: SaveNoteCommand) {
  }

  ngOnChanges(): void {
    this.noteBody = this.note?.body
  }

  saveNote(event: Event) {
    const element = event.target as Element;

    element.childNodes.forEach(function (childElement) {
      if (childElement.nodeType === 3) {
        const wrapper = document.createElement('div');

        childElement.parentNode!.insertBefore(wrapper, childElement);
        wrapper.append(childElement);
      }
    })

    if (this.note) {
      this.note.body = element.innerHTML;

      this.note.updated = Date.now().toString();

      this.note.characters = element.innerHTML.replace(/<\/div>|<div>|<br>|&nbsp;/g, '').length;
      this.note.words = element.innerHTML.replace(/<\/div>|<div>|<br>|&nbsp;/g, ' ').trim().split(/\s+/).length;

      clearTimeout(this.timeoutId as NodeJS.Timeout);
      this.timeoutId = setTimeout(() => this.saveNoteCommand.execute(), 2000);
    }
  }
}
