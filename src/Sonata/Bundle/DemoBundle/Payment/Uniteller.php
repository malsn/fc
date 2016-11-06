<?php

namespace Sonata\Bundle\DemoBundle\Payment;

use Sonata\Component\Basket\BasketInterface;
use Sonata\Component\Order\OrderInterface;
use Sonata\Component\Payment\BasePayment;
use Sonata\Component\Payment\TransactionInterface;
use Sonata\Component\Product\ProductInterface;
use Symfony\Component\HttpFoundation\Response;
use Sonata\Component\Transformer\BaseTransformer;
use Symfony\Component\Routing\RouterInterface;
use Buzz\Browser;

class Uniteller extends BasePayment
{
    /**
     * @var RouterInterface
     */
    protected $router;
    /**
     * @var Browser
     */
    protected $browser;

    /**
     * @param RouterInterface $router
     * @param Browser|null $browser
     * @param BaseTransformer $basket_transformer
     * @param BaseTransformer $order_transformer
     * @param array $options
     */
    public function __construct(RouterInterface $router, Browser $browser = null, BaseTransformer $basket_transformer, BaseTransformer $order_transformer, array $options)
    {
        $this->setCode('uniteller');
        $this->setEnabled(true);
        $this->setName('Visa/Mastercard через Uniteller');
        $this->addTransformer('basket', $basket_transformer);
        $this->addTransformer('order', $order_transformer);
        $this->setOptions($options);

        $this->router = $router;
        $this->browser = $browser;
    }
    /**
     * {@inheritdoc}
     */
    public function getCode()
    {
        return 'uniteller';
    }

    public function getName()
    {
        return 'Visa/Mastercard через Uniteller';
    }

    function __call($name, $arguments)
    {
        // TODO: Implement __call() method.
    }

    /**
     * Send information to the bank, this method should handle
     * everything when called
     *
     * @param  \Sonata\Component\Order\OrderInterface $order
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function sendbank(OrderInterface $order)
    {
        // TODO: Implement sendbank() method.
        $params = array(
            'Shop_IDP' => $this->getOption('Uniteller_Point_ID'),
            'Order_IDP' => $order->getId(),
            'Subtotal_P' => sprintf('%0.2f', $order->getTotalInc()),
            'Signature' => strtoupper(md5(md5($this->getOption('Uniteller_Point_ID')).'&'.md5($order->getId()).'&'.md5($order->getTotalInc()).'&'.md5('').'&'.md5('').'&'.md5(300).'&'.md5('').'&'.md5('').'&'.md5('').'&'.md5('').'&'.md5($this->getOption('password')))),
            'Language' => 'ru',
            'Email' => $order->getCustomer()->getEmail(),
            'URL_RETURN_OK' => 'http://foodcityspb.ru'.$this->router->generate($this->getOption('success_url')),
            'URL_RETURN_NO' => 'http://foodcityspb.ru'.$this->router->generate($this->getOption('decline_url')),
            'Lifetime' => 300,
        );

        // call the callback handler ...
        $form_request = new \Buzz\Message\Form\FormRequest;
        $form_request->setFields($params);
        return new Response('<iframe style="width:100%; height: 400px;" src="'.$this->getOption('payment_url').'?'.$form_request->getContent().'"></iframe>');
    }

    /**
     *
     * @param  \Sonata\Component\Payment\TransactionInterface $transaction
     * @return boolean                                        true if callback ok else false
     */
    public function isCallbackValid(TransactionInterface $transaction)
    {
        // TODO: Implement isCallbackValid() method.
    }

    /**
     * Method called when an error occurs
     *
     * @param \Sonata\Component\Payment\TransactionInterface $transaction
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handleError(TransactionInterface $transaction)
    {
        // TODO: Implement handleError() method.
    }

    /**
     * Send post back confirmation to the bank when the bank callback the site
     *
     * @param  \Sonata\Component\Payment\TransactionInterface $transaction
     * @return \Symfony\Component\HttpFoundation\Response,    false otherwise
     */
    public function sendConfirmationReceipt(TransactionInterface $transaction)
    {
        // TODO: Implement sendConfirmationReceipt() method.
    }

    /**
     * Test if the request variables are valid for the current request
     *
     * WARNING : this methods does not check if the callback is valid
     *
     * @param \Sonata\Component\Payment\TransactionInterface $transaction
     *
     * @return boolean true if all parameter are ok
     */
    public function isRequestValid(TransactionInterface $transaction)
    {
        // TODO: Implement isRequestValid() method.
    }

    /**
     * return true is the basket is valid for the current bank gateway
     *
     * @param \Sonata\Component\Basket\BasketInterface $basket
     *
     * @return boolean
     */
    public function isBasketValid(BasketInterface $basket)
    {
        // TODO: Implement isBasketValid() method.
        return true;
    }

    /**
     * return true if the product can be added to the basket
     *
     * @param \Sonata\Component\Basket\BasketInterface $basket
     * @param \Sonata\Component\Product\ProductInterface $product
     */
    public function isAddableProduct(BasketInterface $basket, ProductInterface $product)
    {
        // TODO: Implement isAddableProduct() method.
        return true;
    }

    /**
     * return the transaction id from the bank
     *
     * @param \Sonata\Component\Payment\TransactionInterface $transaction
     */
    public function applyTransactionId(TransactionInterface $transaction)
    {
        // TODO: Implement applyTransactionId() method.
    }

    /**
     * return the order reference from the transaction
     *
     * @param \Sonata\Component\Payment\TransactionInterface $transaction
     *
     * @return string
     */
    public function getOrderReference(TransactionInterface $transaction)
    {
        // TODO: Implement getOrderReference() method.
    }
}