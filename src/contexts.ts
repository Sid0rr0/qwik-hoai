import type { Signal } from '@builder.io/qwik'
import { createContextId } from '@builder.io/qwik'

export const SelectedProjectsTypeContext = createContextId<Signal<boolean>>(
  'SelectedProjectsTypeContext'
)
export const InfoOpenedContext =
  createContextId<Signal<boolean>>('InfoOpenedContext')
