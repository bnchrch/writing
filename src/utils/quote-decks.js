/**
 * Turn stacked quote cards into a small, accessible carousel.
 *
 * Authors provide readable HTML that works without JavaScript:
 *
 *   <div class="quote-deck" data-label="Abilities">
 *     <blockquote class="quote-card">...</blockquote>
 *     <blockquote class="quote-card">...</blockquote>
 *   </div>
 *
 * Enhancement shows one card at a time and adds previous/next controls plus a
 * progress indicator. The original stacked quotes remain the no-JS fallback.
 */
export function enhanceQuoteDecks(root) {
  if (!root || typeof root.querySelectorAll !== 'function') return

  const decks = root.querySelectorAll('.quote-deck')

  decks.forEach((deck, deckIndex) => {
    if (deck.dataset.enhanced === 'true') return

    const cards = Array.from(deck.querySelectorAll(':scope > .quote-card'))
    if (cards.length < 2) return

    deck.dataset.enhanced = 'true'
    deck.classList.add('quote-deck--enhanced')
    deck.setAttribute('role', 'region')
    deck.setAttribute('aria-roledescription', 'carousel')
    deck.setAttribute(
      'aria-label',
      `${deck.dataset.label || 'Research'} examples`
    )

    const controls = document.createElement('div')
    controls.className = 'quote-deck__controls'

    const previous = createButton('Previous', '←')
    const next = createButton('Next', '→')

    const status = document.createElement('span')
    status.className = 'quote-deck__status'
    status.setAttribute('aria-live', 'polite')
    status.setAttribute('aria-atomic', 'true')

    const progress = document.createElement('span')
    progress.className = 'quote-deck__progress'
    progress.setAttribute('aria-hidden', 'true')

    const progressValue = document.createElement('span')
    progressValue.className = 'quote-deck__progress-value'
    progress.appendChild(progressValue)

    controls.appendChild(previous)
    controls.appendChild(status)
    controls.appendChild(progress)
    controls.appendChild(next)
    deck.appendChild(controls)

    let activeIndex = 0

    function show(index) {
      activeIndex = (index + cards.length) % cards.length

      cards.forEach((card, cardIndex) => {
        const active = cardIndex === activeIndex
        card.hidden = !active
        card.setAttribute('aria-hidden', active ? 'false' : 'true')
        card.setAttribute('role', 'group')
        card.setAttribute('aria-roledescription', 'slide')
        card.setAttribute('aria-label', `${cardIndex + 1} of ${cards.length}`)
        card.id = `quote-card-${deckIndex + 1}-${cardIndex + 1}`
      })

      status.textContent = `${activeIndex + 1} of ${cards.length}`
      progressValue.style.width = `${((activeIndex + 1) / cards.length) * 100}%`
      previous.setAttribute('aria-controls', cards[activeIndex].id)
      next.setAttribute('aria-controls', cards[activeIndex].id)
    }

    previous.addEventListener('click', () => show(activeIndex - 1))
    next.addEventListener('click', () => show(activeIndex + 1))

    deck.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
      event.preventDefault()
      show(activeIndex + (event.key === 'ArrowRight' ? 1 : -1))
    })

    show(0)
  })
}

function createButton(label, symbol) {
  const button = document.createElement('button')
  button.type = 'button'
  button.className = 'quote-deck__button'
  button.setAttribute('aria-label', `${label} example`)
  button.title = `${label} example`
  button.textContent = symbol
  return button
}
