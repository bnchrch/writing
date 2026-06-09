/**
 * Progressively enhance any `.atom-tabs` container in rendered post HTML into
 * an accessible tabbed interface.
 *
 * The Markdown authors each domain as:
 *
 *   <div class="atom-tabs" data-default="Physics">
 *     <div class="atom-tab" data-label="Physics"> …markdown… </div>
 *     <div class="atom-tab" data-label="Design"> …markdown… </div>
 *     …
 *   </div>
 *
 * Without JS the panels simply stack (a fine, fully-readable fallback). This
 * function gives the container a subtle background, a tab bar at the top AND
 * the bottom, hides the inactive panels, and wires up click + arrow-key
 * switching. The bottom bar additionally scrolls back to the top of the
 * section when used, so a reader who reaches the end of a long panel can pick
 * the next one and jump straight to it. Idempotent across route changes.
 *
 * @param {ParentNode} root - element/document to search within (e.g. the
 *   markdown content container).
 */
export function enhanceTabs(root) {
  if (!root || typeof root.querySelectorAll !== 'function') return

  const containers = root.querySelectorAll('.atom-tabs')

  containers.forEach((container) => {
    // Idempotency: never enhance the same container twice.
    if (container.dataset.enhanced === 'true') return

    const panels = Array.from(container.querySelectorAll(':scope > .atom-tab'))
    if (panels.length === 0) return

    container.dataset.enhanced = 'true'
    container.classList.add('atom-tabs--enhanced')

    const defaultLabel = container.dataset.default
    let activeIndex = panels.findIndex((p) => p.dataset.label === defaultLabel)
    if (activeIndex < 0) activeIndex = 0

    // Give each panel its identity once (shared by both bars).
    panels.forEach((panel, i) => {
      const label = panel.dataset.label || `Tab ${i + 1}`
      panel.id = `atom-panel-${Math.abs(hashLabel(label))}-${i}`
      panel.setAttribute('role', 'tabpanel')
    })

    const bars = [] // { buttons, position }

    function buildBar(position) {
      const bar = document.createElement('div')
      bar.className = `atom-tabs__bar atom-tabs__bar--${position}`
      bar.setAttribute('role', 'tablist')

      const buttons = panels.map((panel, i) => {
        const label = panel.dataset.label || `Tab ${i + 1}`
        const button = document.createElement('button')
        button.type = 'button'
        button.className = 'atom-tab-button'
        button.textContent = label
        button.id = `atom-tab-${position}-${Math.abs(hashLabel(label))}-${i}`
        button.setAttribute('role', 'tab')
        button.setAttribute('aria-controls', panel.id)

        // Label the panel from the top bar's button.
        if (position === 'top') panel.setAttribute('aria-labelledby', button.id)

        // Clicking the bottom bar jumps back up to the top of the section.
        button.addEventListener('click', () =>
          activate(i, { scrollToTop: position === 'bottom' })
        )
        button.addEventListener('keydown', (e) => {
          const last = panels.length - 1
          let next
          if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % panels.length
          else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i - 1 + panels.length) % panels.length
          else if (e.key === 'Home') next = 0
          else if (e.key === 'End') next = last
          else return
          e.preventDefault()
          activate(next, { focusPosition: position })
        })

        bar.appendChild(button)
        return button
      })

      bars.push({ buttons, position })
      return bar
    }

    function activate(index, opts = {}) {
      panels.forEach((panel, i) => {
        if (i === index) panel.removeAttribute('hidden')
        else panel.setAttribute('hidden', '')
      })
      bars.forEach(({ buttons }) => {
        buttons.forEach((button, i) => {
          const selected = i === index
          button.setAttribute('aria-selected', selected ? 'true' : 'false')
          // Roving tabindex: only the active tab is in the tab order.
          button.tabIndex = selected ? 0 : -1
          button.classList.toggle('atom-tab-button--active', selected)
        })
      })
      activeIndex = index

      if (opts.scrollToTop) {
        const reduce =
          typeof window.matchMedia === 'function' &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches
        container.scrollIntoView({
          behavior: reduce ? 'auto' : 'smooth',
          block: 'start',
        })
      }
      if (opts.focusPosition) {
        const set = bars.find((b) => b.position === opts.focusPosition)
        if (set) set.buttons[index].focus()
      }
    }

    const topBar = buildBar('top')
    const bottomBar = buildBar('bottom')
    container.insertBefore(topBar, container.firstChild)
    container.appendChild(bottomBar)
    activate(activeIndex)
  })
}

// Small stable hash so panel/tab ids are unique and deterministic per label.
function hashLabel(label) {
  let hash = 0
  for (let i = 0; i < label.length; i += 1) {
    hash = (hash << 5) - hash + label.charCodeAt(i)
    hash |= 0
  }
  return hash
}
