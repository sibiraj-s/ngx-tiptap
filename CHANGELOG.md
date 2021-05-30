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
