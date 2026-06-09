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
 * function builds a tablist, hides the inactive panels, and wires up click +
 * arrow-key switching. It is idempotent so it can run again on route changes.
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

    // Build the tablist.
    const bar = document.createElement('div')
    bar.className = 'atom-tabs__bar'
    bar.setAttribute('role', 'tablist')

    const buttons = panels.map((panel, i) => {
      const label = panel.dataset.label || `Tab ${i + 1}`
      const tabId = `atom-tab-${i}-${Math.abs(hashLabel(label))}`
      const panelId = `${tabId}-panel`

      const button = document.createElement('button')
      button.type = 'button'
      button.className = 'atom-tab-button'
      button.textContent = label
      button.id = tabId
      button.setAttribute('role', 'tab')
      button.setAttribute('aria-controls', panelId)

      panel.id = panelId
      panel.setAttribute('role', 'tabpanel')
      panel.setAttribute('aria-labelledby', tabId)

      button.addEventListener('click', () => activate(i))
      button.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault()
          activate((i + 1) % panels.length, true)
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault()
          activate((i - 1 + panels.length) % panels.length, true)
        } else if (e.key === 'Home') {
          e.preventDefault()
          activate(0, true)
        } else if (e.key === 'End') {
          e.preventDefault()
          activate(panels.length - 1, true)
        }
      })

      bar.appendChild(button)
      return button
    })

    function activate(index, focus) {
      panels.forEach((panel, i) => {
        const selected = i === index
        if (selected) {
          panel.removeAttribute('hidden')
        } else {
          panel.setAttribute('hidden', '')
        }
        buttons[i].setAttribute('aria-selected', selected ? 'true' : 'false')
        // Roving tabindex: only the active tab is in the tab order.
        buttons[i].tabIndex = selected ? 0 : -1
        buttons[i].classList.toggle('atom-tab-button--active', selected)
      })
      activeIndex = index
      if (focus) buttons[index].focus()
    }

    container.insertBefore(bar, container.firstChild)
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
