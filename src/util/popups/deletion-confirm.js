import dispatcher from '../dispatcher';

/**
 * @param {Function} deleteAction
 * @returns {void}
 */
export default function PopupDeletionConfirm(deleteAction) {
  /** @type {import("../../components/Popup").PopupPayload} */
  const popupPayload = {
    title: 'Delete row?',
    messages: 'Confirm deletition of the last row. This action cannot be reversed.',
    hideable: true,
    acceptText: 'Delete',
    acceptAction: deleteAction,
  };

  dispatcher.call('popup', popupPayload);
}
