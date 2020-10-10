export interface Popup extends anyObject {

}
export interface PopupManagerBase {
  modalFade: boolean
  modalDom?: HTMLElement | null
  getInstance(id: string): Popup
  register(id: string, instance: Popup): void
  deregister(id: string): void
  nextZIndex(): number
  doOnModalClick(): void
  openModal(id: string, zIndex: number, dom: HTMLElement | undefined | null, modalClass: string, modalFade: boolean): void
  closeModal(id: string): void
  modalStack: any[]
}
export interface PopupManager extends PopupManagerBase {
  zIndex: number
}