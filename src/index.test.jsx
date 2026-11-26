import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Screen } from './index.jsx';

describe('Dice roller', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows intro instructions and all die buttons initially', () => {
    render(<Screen />);
    expect(
      screen.getByRole('heading', { name: /click on the number buttons above/i })
    ).toBeInTheDocument();
    for (const sides of [20, 12, 10, 8, 6, 4]) {
      expect(screen.getByRole('button', { name: String(sides) })).toBeInTheDocument();
    }
  });

  it('rolls dice, computes damage/resistance, and resets', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
    const user = userEvent.setup();
    render(<Screen />);

    await user.click(screen.getByRole('button', { name: '6' }));
    expect(screen.getByText('1d6')).toBeInTheDocument();
    expect(screen.getByText('4 damage')).toBeInTheDocument();
    expect(screen.getByText('2 with resistance')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Reset' }));
    expect(
      screen.getByRole('heading', { name: /click on the number buttons above/i })
    ).toBeInTheDocument();
  });

  it('shows advantage and disadvantage when rolling 2d20', async () => {
    vi.spyOn(Math, 'random')
      .mockReturnValueOnce(0.1) // 3
      .mockReturnValueOnce(0.9); // 19
    const user = userEvent.setup();
    render(<Screen />);

    const d20 = screen.getByRole('button', { name: '20' });
    await user.click(d20);
    await user.click(d20);

    expect(screen.getByText('2d20')).toBeInTheDocument();
    expect(screen.getByText('19 Advantage')).toBeInTheDocument();
    expect(screen.getByText('3 Disadvantage')).toBeInTheDocument();
  });
});
