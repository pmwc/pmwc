import { h } from 'preact'
import './styles.js'

import {
  CircularProgress
} from './index.js'

import { Button } from '@pmwc/button'

export default {
  title: 'CircularProgress',
  component: CircularProgress
}

export const basic = () => (
  <section>
    <p />
    <CircularProgress />

    <p>secondary</p>
    <CircularProgress secondary />

    <p>progress={0.3} </p>
    <CircularProgress progress={0.3} />

    <p>progress={0.6}</p>
    <CircularProgress progress={0.6} />

    <p>progress={0.9} secondary</p>
    <CircularProgress progress={0.9} secondary />
  </section>
)

export const sizing = () => (
  <section>
    <CircularProgress size='xsmall' />
    <CircularProgress size='small' />
    <CircularProgress size='medium' />
    <CircularProgress size='large' />
    <CircularProgress size='xlarge' />
    <CircularProgress size={72} />
  </section>
)

export const useWithOthers = () => (
  <section>
    <Button
      icon={<CircularProgress theme='secondary' />}
      label='Cookies'
    />
    {/*
    <List>
      <SimpleListItem graphic={<CircularProgress />} text="Pizza" />
      <SimpleListItem graphic="favorite" text="Icecream" />
    </List>

    <Chip icon={<CircularProgress />} label="Donuts" />
    */}
  </section>
)
