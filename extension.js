//    Move Workspace Indicator
//    GNOME Shell extension
//    @fthx 2025


import GLib from 'gi://GLib';

import * as Main from 'resource:///org/gnome/shell/ui/main.js';


export default class MoveWorkspaceIndicatorExtension {
    _moveWorkspaceIndicator(active) {
        let workspaceIndicator = Main.panel.statusArea['workspace-indicator'];
        if (!workspaceIndicator)
            return;

        if (active) {
            Main.panel.statusArea.activities.hide();

            Main.panel._rightBox.remove_child(workspaceIndicator.container);
            Main.panel._leftBox.insert_child_at_index(workspaceIndicator.container, 0);
        } else {
            Main.panel.statusArea.activities.show();

            Main.panel._leftBox.remove_child(workspaceIndicator.container);
            Main.panel._rightBox.insert_child_at_index(workspaceIndicator.container, 0);
        }
    }

    enable() {
        this._timeout = GLib.timeout_add(GLib.PRIORITY_DEFAULT, 300, () => {
                this._moveWorkspaceIndicator(true);

                this._timeout = null;
                return GLib.SOURCE_REMOVE;
            });
    }

    disable() {
        this._moveWorkspaceIndicator(false);

        if (this._timeout) {
            GLib.Source.remove(this._timeout);
            this._timeout = null;
        }
    }
}
