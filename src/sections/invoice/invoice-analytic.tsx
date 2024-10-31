import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import { fCurrency, fShortenNumber } from 'src/utils/format-number';

import { varAlpha } from 'src/theme/styles';
import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
  icon: string;
  title: string;
  subtitle: string;
  // total: number;
  price: number;
  color?: string;
  percent: number;
  label?: string;
};

export function InvoiceAnalytic({ title, icon, subtitle, color, percent, price, label }: Props) {
  return (
    <Stack
      spacing={2.5}
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{ width: 1, minWidth: 200 }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ position: 'relative' }}>
        <Iconify icon={icon} width={32} sx={{ color, position: 'absolute' }} />

        <CircularProgress
          size={56}
          thickness={2}
          value={percent}
          variant="determinate"
          sx={{ color, opacity: 0.48 }}
        />

        <CircularProgress
          size={56}
          value={100}
          thickness={3}
          variant="determinate"
          sx={{
            top: 0,
            left: 0,
            opacity: 0.48,
            position: 'absolute',
            color: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.16),
          }}
        />
      </Stack>

      <Stack spacing={0.5}>
        <Typography variant="subtitle1">{title}</Typography>

        <Typography variant="body2" sx={{ color: 'text.disabled'}}>{subtitle}</Typography>

        <Typography variant="subtitle2">{price} Minutes</Typography>
        
        {label && <Label color='error'>{label}</Label>}
      </Stack>
    </Stack>
  );
}
