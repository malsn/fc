<?php

/*
 * This file is part of the Sonata package.
 *
 * (c) Thomas Rabaix <thomas.rabaix@sonata-project.org>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Application\Sonata\Component\Basket;

use Sonata\Component\Customer\CustomerInterface;
use Sonata\Component\Currency\CurrencyDetectorInterface;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

/**
 * Class BasketSessionFactory
 * @package Application\Sonata\Component\Basket
 */
class BasketSessionFactory extends BaseBasketFactory
{
    /**
     * @var \Application\Sonata\Component\Basket\BasketManagerInterface
     */
    protected $basketManager;

    /**
     * @var \Application\Sonata\Component\Basket\BasketBuilderInterface
     */
    protected $basketBuilder;

    /**
     * @var \Sonata\Component\Currency\CurrencyDetectorInterface
     */
    protected $currencyDetector;

    /**
     * @var \Symfony\Component\HttpFoundation\Session\SessionInterface
     */
    protected $session;

    /**
     * @param \Application\Sonata\Component\Basket\BasketManagerInterface    $basketManager
     * @param \Application\Sonata\Component\Basket\BasketBuilderInterface    $basketBuilder
     * @param CurrencyDetectorInterface $currencyDetector
     * @param SessionInterface          $session
     */
    public function __construct(BasketManagerInterface $basketManager, BasketBuilderInterface $basketBuilder, CurrencyDetectorInterface $currencyDetector, SessionInterface $session)
    {
        $this->basketManager    = $basketManager;
        $this->basketBuilder    = $basketBuilder;
        $this->currencyDetector = $currencyDetector;
        $this->session          = $session;
    }

    /**
     * {@inheritdoc}
     */
    public function load(CustomerInterface $customer)
    {
        // always clone the basket so it can be only saved by calling
        // the save method
        return clone parent::load($customer);
    }


    /**
     * @param \Application\Sonata\Component\Basket\BasketInterface $basket
     */
    public function save(BasketInterface $basket)
    {
        $this->storeInSession($basket);
    }


    /**
     * @param \Application\Sonata\Component\Basket\BasketInterface $basket
     * @param bool|true $full
     */
    public function reset(BasketInterface $basket, $full = true)
    {
        $basket->reset($full);
        $this->save($basket);
    }
}
