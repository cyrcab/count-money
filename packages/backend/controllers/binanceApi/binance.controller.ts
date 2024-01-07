import { Request, Response } from 'express'
import axios from 'axios'
import { errorHandler } from '../../middleware/errors.middleware'
import { redisClient } from '../../libs/redis'

enum BinanceIntervals {
  '1d' = '1d',
  '1w' = '1w',
  '1m' = '1M',
  '1y' = '1Y',
}

interface BinanceQueryParams {
  symbol: string
  interval: BinanceIntervals
  limit: number
}

export const callToBinance = async (req: Request, res: Response) => {
  try {
    if (!req.query.symbol) throw new Error('Symbol is required')
    if (!req.query.interval) throw new Error('Interval is required')
    if (!req.query.limit) throw new Error('Limit is required')

    const params: BinanceQueryParams = {
      symbol: req.query.symbol as string,
      interval: req.query.interval as BinanceIntervals,
      limit: parseInt(req.query.limit.toString(), 10),
    }

    const specificKey = `${params.symbol}-${params.interval}-${params.limit}`

    const cacheResult = await redisClient.get(specificKey)

    if (cacheResult) {
      return res.status(200).json(JSON.parse(cacheResult))
    }

    const response = await axios.get('https://api.binance.com/api/v3/uiKlines', {
      params: {
        symbol: params.symbol,
        interval: params.interval,
        limit: params.limit,
      },
    })

    await redisClient.setEx(specificKey, 600, JSON.stringify(response.data))

    return res.status(response.status).json(response.data)
  } catch (error) {
    if (
      error.message === 'Symbol is required' ||
      error.message === 'Interval is required' ||
      error.message === 'Limit is required'
    ) {
      return res.status(400).json({ message: error.message })
    } else if (error.response.data && error.response.data.msg) {
      return res.status(error.response.status).json({ message: error.response.data.msg })
    }
    errorHandler(error, req, res)
  }
}
