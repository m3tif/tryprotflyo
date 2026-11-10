import Magnet from '../reactbits/Magnet';
import useMediaQuery from '../../hooks/useMediaQuery';
import { MQ } from '../../lib/gsap';

/**
 * A pill-shaped call to action with a magnetic pull (React Bits <Magnet>)
 * and a fill that rises from below on hover. Renders an <a> when `href`
 * is given, otherwise a <button>.
 */
export default function MagneticButton({
  href,
  onClick,
  children,
  icon,
  variant = 'solid',
  className = '',
  cursor, // eslint-disable-line no-unused-vars
  ...props
}) {
  const fine = useMediaQuery(MQ.fine);
  const Tag = href ? 'a' : 'button';
  const base =
    variant === 'solid'
      ? 'bg-ivory text-ink'
      : 'border border-ivory/30 text-ivory';

  return (
    <Magnet padding={70} magnetStrength={3} disabled={!fine} wrapperClassName={className}>
      <Tag
        href={href}
        onClick={onClick}
        type={href ? undefined : 'button'}
        className={`group relative inline-flex min-h-14 items-center gap-3 overflow-hidden rounded-full px-7 py-4 text-[0.95rem] font-medium transition-colors duration-500 ${base}`}
        {...props}
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 translate-y-full rounded-[inherit] bg-electric transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-y-0 group-focus-visible:translate-y-0"
        />
        <span className="roll relative">
          <span>{children}</span>
          <span aria-hidden="true" className="not-italic! text-ink">
            {children}
          </span>
        </span>
        {icon && (
          <span className="relative transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-45 group-hover:text-ink">
            {icon}
          </span>
        )}
      </Tag>
    </Magnet>
  );
}
