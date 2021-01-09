# @chiyu/react-modal-manager

## description:
A tool to manager yours modal components. Let u control your modal components easily.


## example:
> u must register your components with type before u use it with `modal.use()`. Then u can use the modal with `modal.open('modalType', {...modalProps})`，it will return a modalId in a `Promise`, u can use `modal.close(modalId)` to close the modal.

```js
import modal from "@chiyu/react-modal-manager";
imoprt ModalComp from '...';

// modal config
modal.config({
    transition: boolean, // use CSSTransition
    transitionName: '', // name-appear name-appear-active name-enter name-enter-active name-exit name-exit-active name-exit-done
    duration: number,
    unmountOnExit: boolean
})

// register your components
modal.use([{ type: "modalName", ele: ModalComp }]);

async function example() {
  const modalId = await modal.open("modalName", { ...modalProps });
  modal.close(modalId);
}
```
