# CHANGELOG

All notable changes to this project will be documented in this file.

> **Tags**
>
> - Features
> - Bug Fixes
> - Performance Improvements
> - Dependency Updates
> - Breaking Changes
> - Enhancements
> - Documentation
> - Internal
> - Refactor

## v11.0.0 (2024-06-19)

#### Breaking Changes

- requires angular 18 ([7b58cfd](https://github.com/sibiraj-s/ngx-tiptap/commit/7b58cfd)), ([3c352a5](https://github.com/sibiraj-s/ngx-tiptap/commit/3c352a5))

## v10.1.0 (2024-03-06)

#### Features

- add support for updateDelay prop in bubble menu ([0680e39](https://github.com/sibiraj-s/ngx-tiptap/commit/0680e39))

## v10.0.0 (2024-03-05)

#### Breaking Changes

- requires angular 17 or greater ([4ea180b](https://github.com/sibiraj-s/ngx-tiptap/commit/4ea180b)), ([cfe57a3](https://github.com/sibiraj-s/ngx-tiptap/commit/cfe57a3))

## v9.1.1 (2023-12-11)

#### Bug Fixes

- fix view not updated on selection with ChangeDetectionStrategy#OnPush ([681dc85](https://github.com/sibiraj-s/ngx-tiptap/commit/681dc85))

## v9.1.0 (2023-11-03)

#### Features

- enable hierarchical injectors in AngularRenderer ([93ec574](https://github.com/sibiraj-s/ngx-tiptap/commit/93ec574))

## v9.0.2 (2023-07-24)

#### Bug Fixes

- update selected input in nodeview with text selection ([0ec762d](https://github.com/sibiraj-s/ngx-tiptap/commit/0ec762d))

## v9.0.1 (2023-07-17)

#### Bug Fixes

- fix trigger ChangeDetection in custom Nodeviews using `updateProps` ([4213560](https://github.com/sibiraj-s/ngx-tiptap/commit/4213560))

## v9.0.0 (2023-07-01)

#### Breaking Changes

- requires angular 16 or greater ([4ea180b](https://github.com/sibiraj-s/ngx-tiptap/commit/4ea180b)), ([cfe57a3](https://github.com/sibiraj-s/ngx-tiptap/commit/cfe57a3))

## v8.0.0 (2023-04-26)

#### Features

- update to tiptap v2 stable ([432f4d2](https://github.com/sibiraj-s/ngx-tiptap/commit/432f4d2))

## v7.0.0 (2022-12-22)

#### Bug Fixes

- fixes ngModelChange is invoked during render without any changes to the model value ([1fcc867](https://github.com/sibiraj-s/ngx-tiptap/commit/1fcc867))

#### Dependency Updates

- update prosemirror-\* peerDependencies ([733aa55](https://github.com/sibiraj-s/ngx-tiptap/commit/733aa55))
- update @tiptap/\* peerDependencies ([03d738f](https://github.com/sibiraj-s/ngx-tiptap/commit/03d738f))
- update devDependencies ([b8b1733](https://github.com/sibiraj-s/ngx-tiptap/commit/b8b1733))

#### Breaking Changes

- requires angular 15 or greater ([ea34042](https://github.com/sibiraj-s/ngx-tiptap/commit/ea34042))
- titap commands like setContent, clearContent requires emitUpdate flag to be passed ([1fcc867](https://github.com/sibiraj-s/ngx-tiptap/commit/1fcc867))

For Example,

**Before**

```js
editor.commands.setContent('Hello World!');
```

**After**

```js
editor.commands.setContent('Hello World!', true);
```

## v6.0.0 (2022-06-27)

#### Breaking Changes

- requires angular 14 or greater ([e7f43bf](https://github.com/sibiraj-s/ngx-tiptap/commit/e7f43bf))

## v5.0.0 (2022-05-07)

#### Bug Fixes

- don't destroy editor from the directive ([c165cc6](https://github.com/sibiraj-s/ngx-tiptap/commit/c165cc6))
- run changeDetection manually after view init ([65f5c1e](https://github.com/sibiraj-s/ngx-tiptap/commit/65f5c1e))

#### Breaking Changes

- Editor should be destroyed manually

```ts
import { Component, OnDestroy } from '@angular/core';
import { Editor } from '@tiptap/core';

@Component({
  selector: 'app-root',
})
export class AppComponent implements OnDestroy {
  editor = new Editor();

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
```

## v4.0.4 (2022-01-18)

#### Bug Fixes

- render json inputs correctly ([3848f59](https://github.com/sibiraj-s/ngx-tiptap/commit/3848f59))

#### Dependency Updates

- update devDependencies ([4d51ff4](https://github.com/sibiraj-s/ngx-tiptap/commit/4d51ff4))

## v4.0.3 (2022-01-13)

#### Bug Fixes

- revert using viewContainerRef instead of applicationRef to create components ([bb34ce7](https://github.com/sibiraj-s/ngx-tiptap/commit/bb34ce7))

#### Dependency Updates

- update peerDependencies ([01bf7ff](https://github.com/sibiraj-s/ngx-tiptap/commit/01bf7ff))
- update devDependencies ([02e1184](https://github.com/sibiraj-s/ngx-tiptap/commit/02e1184))

## v4.0.2 (2022-01-11)

#### Refactor

- use viewContainerRef instead of applicationRef to create components ([454be3e](https://github.com/sibiraj-s/ngx-tiptap/commit/454be3e))

#### Dependency Updates

- update peerDependencies ([f759fb2](https://github.com/sibiraj-s/ngx-tiptap/commit/f759fb2))
- update devDependencies ([dd265dc](https://github.com/sibiraj-s/ngx-tiptap/commit/dd265dc))

#### Internal

- replace chalk with picocolors ([be8b0f8](https://github.com/sibiraj-s/ngx-tiptap/commit/be8b0f8))
- remove unused imports ([b73aa97](https://github.com/sibiraj-s/ngx-tiptap/commit/b73aa97))

## v4.0.1 (2021-12-08)

#### Bug Fixes

- allow setting empty string to ngModel ([89c510e](https://github.com/sibiraj-s/ngx-tiptap/commit/89c510e))

#### Dependency Updates

- update peerDependencies ([1489f44](https://github.com/sibiraj-s/ngx-tiptap/commit/1489f44))

#### Internal

- cleanup tests ([eefdfe4](https://github.com/sibiraj-s/ngx-tiptap/commit/eefdfe4))

## v4.0.0 (2021-11-24)

#### Breaking Changes

- requires angular 13 ([917768c](https://github.com/sibiraj-s/ngx-tiptap/commit/917768c))

## v3.0.4 (2021-09-28)

#### Bug Fixes

- destory component when nodeview is removed ([8ed4db8](https://github.com/sibiraj-s/ngx-tiptap/commit/8ed4db8))

#### Dependency Updates

- update peerDependencies ([bdc9db7](https://github.com/sibiraj-s/ngx-tiptap/commit/bdc9db7))

## v3.0.3 (2021-08-13)

#### Dependency Updates

- update tiptap dependencies ([19366aa](https://github.com/sibiraj-s/ngx-tiptap/commit/19366aa))
- update angular dependencies ([a1832b4](https://github.com/sibiraj-s/ngx-tiptap/commit/a1832b4))

## v3.0.2 (2021-07-31)

#### Dependency Updates

- update tiptap dependencies ([94f02da](https://github.com/sibiraj-s/ngx-tiptap/commit/94f02da))

## v3.0.1 (2021-07-18)

#### Bug Fixes

- make `AngularRenderer` more generic ([34d5c70](https://github.com/sibiraj-s/ngx-tiptap/commit/34d5c70))

## v3.0.0 (2021-07-17)

#### Breaking Changes

- update `Input` decorators for `AngularNodeViewComponent` component ([8b9bed1](https://github.com/sibiraj-s/ngx-tiptap/commit/8b9bed1))

Before

```ts
this.props.selected;
this.props.updatedAttributes;
```

After

```ts
this.selected;
this.updateAttributes;
```

## v2.1.2 (2021-07-14)

#### Bug Fixes

- set correct styles for editable component ([2b53819](https://github.com/sibiraj-s/ngx-tiptap/commit/2b53819))

## v2.1.1 (2021-07-13)

#### Bug Fixes

- use correct peerDependencies ([e48cf70](https://github.com/sibiraj-s/ngx-tiptap/commit/e48cf70))

## v2.1.0 (2021-05-30)

#### Features

- add `deleteNode` method to component prop ([7a170a0](https://github.com/sibiraj-s/ngx-tiptap/commit/7a170a0))

#### Bug Fixes

- set correct semver for tiptap packages ([5b08331](https://github.com/sibiraj-s/ngx-tiptap/commit/5b08331))
- move contentDOM on editor update ([c5f71d9](https://github.com/sibiraj-s/ngx-tiptap/commit/c5f71d9))
- move all child nodes within EditorContent ([883798e](https://github.com/sibiraj-s/ngx-tiptap/commit/883798e))
- add missing `@angular/forms` peerDependency ([467619e](https://github.com/sibiraj-s/ngx-tiptap/commit/467619e))

#### Dependency Updates

- update peerDependencies ([52307d4](https://github.com/sibiraj-s/ngx-tiptap/commit/52307d4))

## v2.0.0 (2021-05-17)

#### Breaking Changes

- requires angular 12 ([28a8176](https://github.com/sibiraj-s/ngx-tiptap/commit/28a8176))

## v1.4.1 (2021-05-16)

#### Bug Fixes

- detectChanges after mounting contentDOMElement ([cc1f8da](https://github.com/sibiraj-s/ngx-tiptap/commit/cc1f8da))

#### Dependency Updates

- update tiptap dependencies ([54ef857](https://github.com/sibiraj-s/ngx-tiptap/commit/54ef857))

## v1.4.0 (2021-05-13)

#### Features

- add `AngularRenderer` to render custom components ([feaa118](https://github.com/sibiraj-s/ngx-tiptap/commit/feaa118)), ([8ec978b](https://github.com/sibiraj-s/ngx-tiptap/commit/8ec978b))
- add `tiptapNodeViewContent` to add contenteditable element inside node views ([8d45055](https://github.com/sibiraj-s/ngx-tiptap/commit/8d45055))

## v1.3.0 (2021-05-11)

#### Features

- support dragging nodeviews ([55c70c0](https://github.com/sibiraj-s/ngx-tiptap/commit/55c70c0))

## v1.2.3 (2021-05-10)

#### Bug Fixes

- update typings ([1237cf0](https://github.com/sibiraj-s/ngx-tiptap/commit/1237cf0))

#### Dependency Updates

- update dependencies and devDependencies ([cfb68de](https://github.com/sibiraj-s/ngx-tiptap/commit/cfb68de))

#### Documentation

- update examples to use `StarterKit` instead of `defaultExtensions` ([92c93c9](https://github.com/sibiraj-s/ngx-tiptap/commit/92c93c9))

## v1.2.2 (2021-05-04)

#### Bug Fixes

- attach `stopEvent` only if provided ([d385e10](https://github.com/sibiraj-s/ngx-tiptap/commit/d385e10))

#### Internal

- fix e2e tests ([27b054a](https://github.com/sibiraj-s/ngx-tiptap/commit/27b054a))

## v1.2.1 (2021-05-04)

#### Bug Fixes

- fix typo in floating-menu directive selector ([99775a0](https://github.com/sibiraj-s/ngx-tiptap/commit/99775a0))

## v1.2.0 (2021-05-03)

#### Features

- add `AngularNodeViewRenderer` to render angular components as nodeViews ([ebb7851](https://github.com/sibiraj-s/ngx-tiptap/commit/ebb7851)), ([4e9911f](https://github.com/sibiraj-s/ngx-tiptap/commit/4e9911f))

## v1.1.0 (2021-05-03)

#### Features

- add support for floating menu and bubble menu ([1a7eded](https://github.com/sibiraj-s/ngx-tiptap/commit/1a7eded))

## v1.0.1 (2021-05-02)

#### Documentation

- add stackblitz demo link ([ae836fe](https://github.com/sibiraj-s/ngx-tiptap/commit/ae836fe))
- update usage guide, install instruction

#### Internal

- enable prod mode for builds ([ed30e81](https://github.com/sibiraj-s/ngx-tiptap/commit/ed30e81))

## v1.0.0 (2021-05-02)

Initial Release: Angular bindings for Tiptap v2
